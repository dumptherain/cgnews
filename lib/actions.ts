"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"

const goto = (path: string | FormData) => {
  let target: string = "/"
  if (typeof path === "string") {
    target = path || "/"
  } else {
    target = path.get("goto")?.toString() || "/"
  }
  revalidatePath(target.substring(0, target.lastIndexOf("?")))
  redirect(target)
}

export const faveAction = async (storyId: number, faved: boolean) => {
  const { userId: clerkId } = auth()
  if (!clerkId) return { success: false, message: "Not Login" }
  const user = await prisma.user.findUnique({ where: { clerkId } })
  if (!user) return { success: false, message: "User not found" }
  if (faved) {
    await prisma.favorite.upsert({
      where: { userId_storyId: { userId: user.id, storyId } },
      update: {},
      create: { userId: user.id, storyId },
    })
  } else {
    await prisma.favorite.delete({ where: { userId_storyId: { userId: user.id, storyId } } }).catch(() => null)
  }
  revalidatePath("/user/favorites")
  return { success: true }
}

export const replyAction = async ({
  parent,
  text,
}: {
  parent: number
  text: string
}) => {
  const { userId: clerkId } = auth()
  if (!clerkId) return { success: false, message: "Not Login" }
  const user = await prisma.user.findUnique({ where: { clerkId } })
  if (!user) return { success: false, message: "User not found" }
  // parent is story id or comment id; assume story for now
  await prisma.comment.create({ data: { storyId: parent, authorId: user.id, text } })
  return { success: true }
}

export type VoteStatus = "up" | "un"
export const voteAction = async (storyId: number, how: VoteStatus) => {
  const { userId: clerkId } = auth()
  if (!clerkId) return { success: false, message: "Not Login" }
  const user = await prisma.user.findUnique({ where: { clerkId } })
  if (!user) return { success: false, message: "User not found" }
  if (how === "up") {
    await prisma.vote.upsert({
      where: { userId_storyId: { userId: user.id, storyId } },
      update: {},
      create: { userId: user.id, storyId },
    })
    await prisma.story.update({ where: { id: storyId }, data: { score: { increment: 1 } } })
  } else {
    await prisma.vote.delete({ where: { userId_storyId: { userId: user.id, storyId } } }).catch(() => null)
    await prisma.story.update({ where: { id: storyId }, data: { score: { decrement: 1 } } })
  }
  revalidatePath("/user/upvoted")
  return { success: true }
}
