import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative h-10 w-10">
        <Image src="/logo.svg" alt="Mod'Elles Logo" fill className="object-contain" />
      </div>
      <span className="font-bold text-xl hidden sm:inline-block">Mod&apos;Elles</span>
    </Link>
  )
}
