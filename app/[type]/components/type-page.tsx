export const dynamic = "force-dynamic"
import { Suspense } from "react"

import { HnStoryType } from "@/lib/hn-types"
import ItemSkeleton from "@/components/item-skeleton"
import TypeStories from "@/app/[type]/components/type-stories"

export default function TypePage({
  pathname,
  storyType,
  currentPage,
}: {
  pathname: string
  storyType: HnStoryType
  currentPage: number
}) {
  return (
    <>
      <Suspense
        key={storyType + currentPage}
        fallback={<ItemSkeleton length={6} />}
      >
        <TypeStories
          pathname={pathname}
          page={currentPage}
          storyType={storyType}
          pageSize={30}
        />
      </Suspense>
    </>
  )
}
