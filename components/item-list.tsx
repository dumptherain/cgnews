"use client"

import Link from "next/link"

import {
  hideCommentCount,
  hideScore,
  hideUsername,
  hideVote,
  hnItem2HnWebStory,
} from "@/lib/hn-item-utils"
import { HnItem } from "@/lib/hn-types"
import Story from "@/components/story"

export interface Props {
  stories: HnItem[]
  offset?: number
  moreLink?: string
}

export default function ItemList({
  stories,
  offset = 1,
  moreLink,
}: Props) {
  return (
    <>
      <div className="space-y-2">
        {stories.map((story, i) => (
          <Story
            key={story.id}
            data={hnItem2HnWebStory(story)}
            hideVote={hideVote(story.type)}
            hidePoints={hideScore(story.type)}
            hideCommentCount={hideCommentCount(story.type)}
            hideUsername={hideUsername(story.type)}
          />
        ))}
      </div>
      <div className="pt-3">
        {moreLink && (
          <Link
            className="text-sm underline"
            href={moreLink}
            prefetch={false}
            scroll={true}
          >
            More
          </Link>
        )}
      </div>
    </>
  )
}
