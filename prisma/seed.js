/* eslint-disable no-console */
const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function main() {
	// Upsert a demo user
	const user = await prisma.user.upsert({
		where: { clerkId: 'seed_user_1' },
		update: {},
		create: {
			clerkId: 'seed_user_1',
			username: 'alice',
			profile: { create: { about: 'Seed user', karma: 100 } },
		},
	})

	// Sample stories
	const stories = [
		{
			title: 'Show CGNews: Minimal HN clone with Next.js',
			url: 'https://example.com/cgnews',
			text: null,
			type: 'SHOW',
			score: 12,
			descendants: 2,
		},
		{
			title: 'Ask CGNews: What stack are you using in 2025?',
			url: null,
			text: 'Share your current production stack and why.',
			type: 'ASK',
			score: 7,
			descendants: 5,
		},
		{
			title: 'Top: Neon + Prisma + Clerk starter',
			url: 'https://example.com/neon-prisma-clerk',
			text: null,
			type: 'TOP',
			score: 25,
			descendants: 8,
		},
		{
			title: 'New: Next.js RSC tips for data fetching',
			url: 'https://example.com/rsc-tips',
			text: null,
			type: 'NEW',
			score: 3,
			descendants: 0,
		},
	]

	for (const s of stories) {
		await prisma.story.create({
			data: {
				title: s.title,
				url: s.url,
				text: s.text,
				type: s.type,
				score: s.score,
				descendants: s.descendants,
				author: { connect: { id: user.id } },
			},
		})
	}

	console.log('Seed completed: 1 user,', stories.length, 'stories')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})


