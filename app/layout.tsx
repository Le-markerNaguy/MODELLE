import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mod'Elles - Plateforme pour les femmes au Gabon",
  description:
    "Mod'Elles est une plateforme dédiée à la santé reproductive et au soutien psychologique des femmes au Gabon",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'