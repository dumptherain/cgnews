"use client"

import { usePathname } from "next/navigation"

import { storyNavConfig } from "@/config/conf"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
// 

interface DesktopNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DesktopNav({ className, ...props }: DesktopNavProps) {
  const pathname = usePathname()

  return (
    <div className={className} {...props}>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {storyNavConfig.map((navItem, index) => {
          return (
            <Link
              key={navItem.name}
              href={navItem.link}
              prefetch={false}
              className={cn(
                "transition-colors hover:text-foreground/80 ",
                pathname === navItem.link ||
                  (pathname === "/" && navItem.name === "Top")
                  ? "text-foreground"
                  : "text-foreground/50"
              )}
            >
              {navItem.name}
            </Link>
          )
        })}
        <Link href="/submit" prefetch={false} className={cn(buttonVariants({ variant: "default" }), "hidden h-8 px-2 ml-2 md:flex")}> 
          <Plus size={16} className="mr-1" /> Submit
        </Link>
      </nav>
    </div>
  )
}
