import { Metadata } from "next"
import { SignIn } from "@clerk/nextjs"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
  }
}

export default function Page({
  searchParams,
}: {
  searchParams: { goto?: string }
}) {
  return <SignIn routing="hash" />
}
