"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useGoto } from "@/hooks"
import { Menu, Plus, X } from "lucide-react"

import { showStoryNav, siteConf } from "@/config/conf"
import { HnUser } from "@/lib/hn-types"
import { Button, buttonVariants } from "@/components/ui/button"
import { DesktopNav } from "@/components/desktop-nav"
import Logo from "@/components/logo"
import MobileNav from "@/components/mobile-nav"
// removed mode toggle
import SearchInput from "@/components/search-input"
import { UserNav } from "@/components/user-nav"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"

export function Header({ user }: { user: HnUser | null }) {
  const pathname = usePathname()
  const goto = useGoto()
  const storyNavVisiable = showStoryNav(pathname)
  const [mobileNavActive, setMobileNavActive] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent site-header font-sans pt-3 sm:pt-4">
      <div className="container max-w-5xl rounded-t-3xl overflow-hidden">
        <div className="mb-0 panel !bg-card flex h-16 items-center justify-between px-6 sm:px-8 rounded-t-3xl rounded-b-none border-b-0">
          <div className="flex items-center space-x-12">
          <Link href="/" className="flex items-center" prefetch={false}>
            <Logo />
          </Link>
            {storyNavVisiable && (
              <DesktopNav className="hidden md:flex" />
            )}
        </div>
          <div className="flex items-center gap-2">
          <SearchInput />
          {user && <UserNav user={user} />}
          {storyNavVisiable && !user && (
              <Button size={"sm"} variant={"outline"} className="ml-1 h-7 px-2 text-xs">
                <Link rel="noreferrer nofollow" href={`/login?goto=${goto}`} className="text-xs">
                Login
              </Link>
            </Button>
          )}
          <div
            className="block md:hidden cursor-pointer p-2"
            onClick={() => setMobileNavActive(!mobileNavActive)}
          >
            {mobileNavActive ? <X size={20} /> : <Menu size={20} />}
          </div>
        </div>
        </div>
      </div>
      <MobileNav active={mobileNavActive} onActiveChange={setMobileNavActive} />
    </header>
  )
}
