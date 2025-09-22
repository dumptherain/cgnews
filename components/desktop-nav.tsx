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
      <nav className="flex items-center gap-1 text-xs">
        <Link
          href="/"
          prefetch={false}
          className={cn(
            "px-2.5 py-1 rounded-sm text-foreground/70 hover:text-accent-foreground tab-underline",
            pathname === "/" ? "text-foreground tab-underline-active" : ""
          )}
        >
          Top
        </Link>
        {storyNavConfig.slice(1, 6).map((navItem, index) => {
          return (
            <Link
              key={navItem.name}
              href={navItem.link}
              prefetch={false}
              className={cn(
                "px-2.5 py-1 rounded-sm text-foreground/70 hover:text-accent-foreground tab-underline",
                pathname === navItem.link ? "text-foreground tab-underline-active" : ""
              )}
            >
              {navItem.name}
            </Link>
          )
        })}
        <Link href="/submit" prefetch={false} className={cn(buttonVariants({ variant: "soft" }), "ml-2 h-8 px-3 text-xs rounded-sm shadow-[0_0_0_1px_hsl(var(--foreground)/0.02)]") }>
          <Plus size={14} className="mr-1" /> Submit
        </Link>
      </nav>
    </div>
  )
}
