import { HnItem } from "@/lib/hn-types"
import { listStoryComments } from "@/lib/data"
import Thread from "@/app/user/components/thread"
import { deleteCommentAction } from "@/lib/actions"
import { currentUser } from "@clerk/nextjs/server"

export default async function Comments({
  story,
  ids,
}: {
  story: HnItem
  ids: number[]
}) {
  const comments = await listStoryComments(story.id)
  const cu = await currentUser()
  const myId = cu?.username || cu?.id
  if (!comments.length) {
    return <div>No comment yet</div>
  }
  return (
    <div>
      {comments.map((c: any) => {
        const canDelete = myId && (myId === c.by) && (Date.now()/1000 - c.time <= 2*60*60)
        return (
          <div key={c.id} className="mb-1">
            <div className="flex items-center justify-between">
              <Thread
                comment={{
                  id: c.id,
                  indent: 0,
                  age: "",
                  time: c.time,
                  userId: c.by,
                  onStory: String(story.id),
                  storyLink: "",
                  commentHtml: c.text,
                  kids: [],
                }}
              />
              {canDelete && (
                <form action={deleteCommentAction} className="ml-2">
                  <input type="hidden" name="commentId" value={c.id} />
                  <input type="hidden" name="storyId" value={story.id} />
                  <button type="submit" className="text-xs text-muted-foreground underline">delete</button>
                </form>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
