import { Suspense } from "react"
import { Metadata, ResolvingMetadata } from "next"

import { getStory } from "@/lib/data"
import Loading from "@/components/loading"

import ItemWithComment from "./components/item-with-comment"

type Props = {
  searchParams: { id: string }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const storyId = Number(searchParams.id)
  const story = await getStory(storyId)
  return {
    title: `${story?.title || "Comment"}`,
  }
}

export default async function Page({ searchParams }: Props) {
  const id = Number(searchParams.id)
  return (
    <Suspense key={id} fallback={<Loading />}>
      <ItemWithComment id={id} />
    </Suspense>
  )
}
