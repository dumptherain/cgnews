"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function SearchInput() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace, push } = useRouter()
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // @ts-expect-error
      const val = event.target.value
      if (val) {
        const target = `/search?query=${val}`
        if (pathname === "/search") {
          replace(target)
        } else {
          push(target)
        }
      }
    }
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const val = (e.target as HTMLFormElement).querySelector('input')?.value
      if (val) {
        const target = `/search?query=${val}`
        if (pathname === "/search") {
          replace(target)
        } else {
          push(target)
        }
      }
    }} className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="h-8 w-40 pl-10 pr-3 text-sm transition-all duration-200 bg-card/60 border border-border/70 rounded-sm focus:w-56 focus:ring-1 focus:ring-ring focus:border-border/50"
        defaultValue={searchParams.get("query")?.toString()}
        name="query"
      />
    </form>
  )
}
