import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import { currentUser } from "@clerk/nextjs/server"
import { ClerkProvider } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/footer"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

import { siteConf } from "@/config/conf"
import { CurrentUserProvider } from "@/hooks/currentUserContext"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConf.title}`,
    default: siteConf.title,
  },
  description: siteConf.description,
  keywords: [
    "Next.js",
    "Shadcn",
    "React",
    "Tailwind CSS",
    "Server Components",
    "CGNews",
  ],
  authors: siteConf.authors,
  creator: siteConf.authors[0].name,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const clerkUser = await currentUser()
  const user = clerkUser
    ? {
        id: clerkUser.username || clerkUser.id,
        about: "",
        created: Math.floor(new Date(clerkUser.createdAt!).getTime() / 1000),
        karma: 0,
        submitted: [],
      }
    : null

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-mono antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CurrentUserProvider currentUser={user}>
              <div className="relative flex min-h-screen flex-col items-center bg-background">
                <Header user={user} />
                <div className="w-full flex-1 flex">
                  <div className="container max-w-5xl flex-1 flex">
                    <div className="rounded-b-md rounded-t-none border border-t-0 border-border/60 bg-card shadow-[0_0_0_1px_hsl(var(--foreground)/0.02)] w-full -mt-2 mb-4 sm:mb-6">
                      <main className="flex flex-1 flex-col pt-6 sm:pt-7 pb-3 px-2 sm:px-4">
                        {children}
                      </main>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
              <Toaster />
            </CurrentUserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
