import { Metadata } from "next"
import { SignUp } from "@clerk/nextjs"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SignUp",
  }
}

export default function Page({
  searchParams,
}: {
  searchParams: { goto?: string }
}) {
  return <SignUp routing="hash" />
}
