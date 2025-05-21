"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Accueil</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/sante" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Santé Reproductive</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/psychologique" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Soutien Psychologique
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/annonces" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Annonces</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/a-propos" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>À propos</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NotificationDropdown />
          <ModeToggle />
          <Button asChild variant="outline" className="mr-2">
            <Link href="/connexion">Connexion</Link>
          </Button>
          <Button asChild className="bg-pink-600 hover:bg-pink-700">
            <Link href="/inscription">Inscription</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <NotificationDropdown />
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link href="/" className="block py-2 hover:text-pink-600">
              Accueil
            </Link>
            <Link href="/sante" className="block py-2 hover:text-pink-600">
              Santé Reproductive
            </Link>
            <Link href="/psychologique" className="block py-2 hover:text-pink-600">
              Soutien Psychologique
            </Link>
            <Link href="/annonces" className="block py-2 hover:text-pink-600">
              Annonces
            </Link>
            <Link href="/a-propos" className="block py-2 hover:text-pink-600">
              À propos
            </Link>
            <Link href="/contact" className="block py-2 hover:text-pink-600">
              Contact
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button asChild variant="outline">
                <Link href="/connexion">Connexion</Link>
              </Button>
              <Button asChild className="bg-pink-600 hover:bg-pink-700">
                <Link href="/inscription">Inscription</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
