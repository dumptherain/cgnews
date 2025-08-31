import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware({
	publicRoutes: [
		"/",
		"/top",
		"/new",
		"/best",
		"/ask",
		"/show",
		"/job",
		"/api/submit",
		"/item/(.*)",
		"/search",
		"/api/(.*)",
	],
})

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
}
