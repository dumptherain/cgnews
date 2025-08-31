# CGNews (Next.js)
This is CGNews built with [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/).

![index](./screenshots/desktop/index.png)

<p style="text-align: center;"><a target="_blank" href="https://nextjs-hackernews-omega.vercel.app">Live Demo</a></p>

## Features

- Next.js App Router
- React Server Components (RSCs) and Suspense
- Server Actions for mutations
- Beautifully designed components from shadcn/ui
- Styling with Tailwind CSS
- Browse stories: Top, Newest, Best, Show, Ask, Jobs.
- Search for stories.
- User authentication: Create an account and log in with Clerk to access personalized features.
- Mark stories as favorite.
- Upvote stories or comments.
- Add comments.
- View user profile: About, Submitted, Comments, Favorites, Upvoted(private).
- Responsive design: Friendly to both mobile and desktop.
- Automatic light/dark mode based on system settings.

## Screenshots

### Desktop
![index-desktop](./screenshots/desktop/index.png)

![story-desktop](./screenshots/desktop/story.png)

![about-desktop](./screenshots/desktop/about.png)

![upvoted-desktop](./screenshots/desktop/upvoted.png)

![comments-desktop](./screenshots/desktop/comments.png)

![login-desktop](./screenshots/desktop/login.png)


### Mobile
<div style="display: inline-block">
  <img
    src="./screenshots/mobile/index.png"
    width="220px"
    alt="index-mobile"
  />
  <img
    src="./screenshots/mobile/story.png"
    width="220px"
    alt="story-mobile"
  />
</div>
<br />
<div style="display: inline-block; margin-top: 18px">
  <img
    src="./screenshots/mobile/about.png"
    width="220px"
    alt="about-mobile"
  />
  <img
    src="./screenshots/mobile/upvoted.png"
    width="220px"
    alt="upvoted-mobile"
  />
</div>
<br />
<div style="display: inline-block; margin-top: 18px">
  <img
    src="./screenshots/mobile/comments.png"
    width="220px"
    alt="comments-mobile"
  />
  <img
    src="./screenshots/mobile/login.png"
    width="220px"
    alt="login-mobile"
  />
</div>

## Running Locally

Requires Node.js 18.17 or later.

0. Clone the project.
```bash
git clone https://github.com/WhiteDG/nextjs-hackernews.git

cd nextjs-hackernews
```

1. Install dependencies.
```bash
pnpm install
```
2. Copy `.env.example` to `.env.local` and update the variables.
```bash
cp .env.example .env.local
```
3. Configure environment variables (Neon + Clerk) in `.env.local`:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxx"
CLERK_SECRET_KEY="sk_test_xxx"
```
4. Initialize Prisma schema locally (if using Neon, ensure DATABASE_URL is set):
```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
```
5. Run the development server with hot reload.
```bash
pnpm dev
```
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

7. Build for production
```bash
pnpm run build
```

8. Serve in production mode
```bash
pnpm start
```

## APIs
This project leverages the power of various APIs to provide an enriched user experience:
This project originally used HN APIs; CGNews now uses Neon (Postgres) + Prisma for data and Clerk for auth.


## License
Licensed under the [MIT license](https://github.com/WhiteDG/nextjs-hackernews/blob/main/LICENSE).
