"use client"

import { useState } from "react"
import { Bell, Check, Calendar, Heart, Clock, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Notification } from "@/types/notification"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

// Données de démonstration pour les notifications
const demoNotifications: Notification[] = [
  {
    id: "1",
    title: "Rappel de rendez-vous",
    message: "Vous avez un rendez-vous avec Dr. Émilie Ntoutoume demain à 14h30.",
    type: "appointment",
    read: false,
    date: new Date(Date.now() + 1000 * 60 * 60 * 24), // demain
    link: "/psychologique/rendez-vous",
  },
  {
    id: "2",
    title: "Groupe de soutien",
    message: "La prochaine session du groupe 'Gestion de l'anxiété' aura lieu jeudi à 17h.",
    type: "group",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // il y a 2 heures
    link: "/psychologique/groupes/gestion-de-l-anxiete",
  },
  {
    id: "3",
    title: "Nouvelle ressource disponible",
    message: "Un nouveau guide sur la contraception est maintenant disponible.",
    type: "resource",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // il y a 1 jour
    link: "/sante",
  },
  {
    id: "4",
    title: "Confirmation de rendez-vous",
    message: "Votre rendez-vous avec Dr. Claire Mba a été confirmé pour le 20 avril à 10h00.",
    type: "appointment",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // il y a 2 jours
    link: "/rendez-vous",
  },
  {
    id: "5",
    title: "Rappel important",
    message: "N'oubliez pas de compléter votre profil de santé pour des recommandations personnalisées.",
    type: "alert",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // il y a 3 jours
    link: "/profil",
  },
]

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "group":
        return <Heart className="h-4 w-4 text-pink-500" />
      case "resource":
        return <Clock className="h-4 w-4 text-green-500" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const formatNotificationDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: fr })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-600"
              variant="default"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
              <Check className="mr-1 h-3 w-3" />
              Tout marquer comme lu
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn("flex flex-col items-start p-3 cursor-pointer", !notification.read && "bg-muted/50")}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full">
                  <div className="flex-shrink-0 mr-2 mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {formatNotificationDate(notification.date)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">Aucune notification pour le moment</div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/notifications" className="w-full text-center justify-center">
            Voir toutes les notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
