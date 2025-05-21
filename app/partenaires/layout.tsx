"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { PartenaireFooter } from "@/components/partenaires/partenaire-footer"

export default function PartenaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/partenaires/connexion"

  // Ne pas afficher le footer sur la page de connexion
  if (isLoginPage) {
    return (
      <>
        {children}
        <Toaster />
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* PartenaireHeader supprimé */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <PartenaireFooter />
      <Toaster />
    </div>
  )
}
