import { prisma } from "./db"
import { sortByHot } from "./ranking"
import { HnItem, HnItemType } from "./hn-types"

type StoryTypeParam =
	| "topstories"
	| "newstories"
	| "beststories"
	| "askstories"
	| "showstories"
	| "jobstories"

const typeMap: Record<StoryTypeParam, string> = {
	topstories: "TOP",
	newstories: "NEW",
	beststories: "BEST",
	askstories: "ASK",
	showstories: "SHOW",
	jobstories: "JOB",
}

function toHnItem(story: any): HnItem {
	return {
		id: story.id,
		deleted: false,
		type: HnItemType.story,
		by: story.author.username,
		time: Math.floor(new Date(story.createdAt).getTime() / 1000),
		text: story.text ?? "",
		dead: false,
		parent: undefined,
		url: story.url ?? "",
		score: story.score ?? 0,
		title: story.title,
		descendants: story.descendants ?? story._count?.comments ?? 0,
	}
}

export async function listStories({
	storyType,
	page = 1,
	pageSize = 30,
	order = "hot",
}: {
	storyType: StoryTypeParam
	page?: number
	pageSize?: number
	order?: "hot" | "new" | "top"
}) {
	const skip = (page - 1) * pageSize
	if (order === "new") {
		const stories = await prisma.story.findMany({
			where: { type: typeMap[storyType] as any },
			orderBy: { createdAt: "desc" },
			skip,
			take: pageSize,
			include: { author: { select: { username: true } }, _count: { select: { comments: true } } },
		})
		return stories.map(toHnItem)
	}
	if (order === "top") {
		const stories = await prisma.story.findMany({
			where: { type: typeMap[storyType] as any },
			orderBy: { score: "desc" },
			skip,
			take: pageSize,
			include: { author: { select: { username: true } }, _count: { select: { comments: true } } },
		})
		return stories.map(toHnItem)
	}
	// hot
	const stories = await prisma.story.findMany({
		where: { type: typeMap[storyType] as any },
		orderBy: { createdAt: "desc" },
		// fetch a larger window then apply hot ranking client-side
		skip: 0,
		take: Math.max(pageSize * 3, 120),
		include: { author: { select: { username: true } }, _count: { select: { comments: true } } },
	})
	const ranked = sortByHot(stories)
	const pageSlice = ranked.slice(skip, skip + pageSize)
	return pageSlice.map(toHnItem)
}


