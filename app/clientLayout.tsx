"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { AuthProvider } from "@/contexts/AuthContext"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { SessionProvider } from "next-auth/react"
import dynamic from "next/dynamic"

const inter = Inter({ subsets: ["latin"] })
const ChatbotEstelle = dynamic(() => import("@/components/chatbot-estelle"), { ssr: false })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <NotificationProvider>
                <Header />
                <main>{children}</main>
                <ChatbotEstelle />
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
