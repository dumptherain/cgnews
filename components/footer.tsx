import Link from "next/link"

import { siteConf } from "@/config/conf"

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
          vibe coded by{" "}
          <Link
            href="https://www.pascalwiemers.com"
            target="_blank"
            className="font-medium underline underline-offset-4"
            rel="noreferrer"
          >
            pascal wiemers
          </Link>
        </div>
      </div>
    </footer>
  )
}
