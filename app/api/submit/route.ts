import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const { userId: clerkId } = await auth()
  if (!clerkId) {
    return NextResponse.redirect(new URL(`/login?goto=/submit`, req.url))
  }
  try {
    let user = await prisma.user.findUnique({ where: { clerkId } })
    if (!user) {
      const cUser = await currentUser()
      const preferredUsername = cUser?.username || clerkId
      user = await prisma.user.create({
        data: { clerkId, username: preferredUsername, profile: { create: {} } },
      })
    } else {
      // Keep username in sync if it changed
      const cUser = await currentUser()
      const desiredUsername = cUser?.username || clerkId
      if (desiredUsername && user.username !== desiredUsername) {
        user = await prisma.user.update({ where: { id: user.id }, data: { username: desiredUsername } })
      }
    }

    const formData = await req.formData()
    const title = String(formData.get("title") || "").trim()
    const url = String(formData.get("url") || "").trim()
    const text = String(formData.get("text") || "").trim()
    if (!title || (!url && !text)) {
      console.warn(`[api/submit] invalid payload`, { title, urlLen: url.length, textLen: text.length })
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 })
    }
    const type = url && url.length > 0 ? "NEW" : "ASK"

    const story = await prisma.story.create({
      data: { title, url: url || null, text: text || null, type: type as any, authorId: user.id },
    })
    console.log(`[api/submit] created story`, { storyId: story.id, type, authorId: user.id })

    if (type === "NEW") {
      revalidatePath("/new")
      revalidatePath("/")
    } else {
      revalidatePath("/ask")
      revalidatePath("/")
    }
    revalidatePath("/user/submitted")

    const dest = type === "NEW" ? "/new" : "/ask"
    return NextResponse.redirect(new URL(dest, req.url))
  } catch (e) {
    console.error(`[api/submit] error`, e)
    return NextResponse.json({ success: false, error: "Submit failed" }, { status: 500 })
  }
}


