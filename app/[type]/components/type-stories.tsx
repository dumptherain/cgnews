import { HnStoryType } from "@/lib/hn-types"
import ItemList from "@/components/item-list"
import { listStories } from "@/lib/data"

export default async function TypeStories({
  pathname,
  storyType,
  page = 1,
  pageSize = 30,
}: {
  page?: number
  pageSize?: number
  storyType: HnStoryType
  pathname: string
}) {
  const limit = pageSize || 30
  const offset = (page - 1) * limit
  const stories = await listStories({ storyType, page, pageSize: limit, order: "hot" })

  const searchParams = new URLSearchParams()
  searchParams.set("page", (+page + 1).toString())

  const moreLink = stories.length < limit ? "" : `/${pathname}?${searchParams.toString()}`
  return <ItemList stories={stories} offset={offset} moreLink={moreLink} />
}
