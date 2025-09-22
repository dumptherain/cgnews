import { siteConf } from "@/config/conf"

export default function Logo() {
  return (
    <div className="md:flex">
      <p className="text-base font-extrabold tracking-tight text-white/95 drop-shadow-none">{siteConf.title}</p>
    </div>
  )
}
