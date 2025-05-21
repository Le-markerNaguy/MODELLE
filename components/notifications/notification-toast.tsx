"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Heart, Clock, AlertCircle, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Notification } from "@/types/notification"

interface NotificationToastProps {
  notification: Notification
  onDismiss?: () => void
}

export function NotificationToast({ notification, onDismiss }: NotificationToastProps) {
  const { toast } = useToast()

  useEffect(() => {
    const { title, message, type } = notification

    toast({
      title,
      description: message,
      action: notification.link ? (
        <Button variant="link" size="sm" asChild className="p-0 h-auto">
          <a href={notification.link}>Voir</a>
        </Button>
      ) : undefined,
      icon: getNotificationIcon(type),
    })
  }, [notification, toast])

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

  return null // Le toast est affiché via le hook useToast
}
