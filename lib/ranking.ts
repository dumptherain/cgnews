export function hotRank(points: number, createdAt: Date, gravity = 1.8): number {
	const ageHours = (Date.now() - createdAt.getTime()) / 3600e3
	return points / Math.pow(ageHours + 2, gravity)
}

export function sortByHot<T extends { score: number; createdAt: Date }>(items: T[]): T[] {
	return [...items].sort((a, b) => hotRank(b.score, b.createdAt) - hotRank(a.score, a.createdAt))
}


