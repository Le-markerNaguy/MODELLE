"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

// Types
interface Notification {
  id: string
  titre: string
  message: string
  lue: boolean
  type: string
  createdAt: string
  lien?: string
}

interface NotificationContextProps {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  error: Error | null
  markAsRead: (id: string) => Promise<void>
  fetchNotifications: () => Promise<void>
  addNotification: (notification: Notification) => void
}

// Création du contexte
const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

// Provider du contexte
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const { user, isAuthenticated } = useAuth()

  // Charger les notifications
  const fetchNotifications = async () => {
    if (!isAuthenticated || !user) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/notifications?userId=${user.id}`)
      if (!res.ok) throw new Error("Erreur lors du chargement des notifications")
      const data = await res.json()
      setNotifications(data)
    } catch (err: any) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Marquer une notification comme lue
  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "POST" })
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) => (notif.id === id ? { ...notif, lue: true } : notif)),
      )
    } catch (err) {
      console.error("Erreur lors du marquage de la notification:", err)
      throw err
    }
  }

  // Ajouter une nouvelle notification (par ex. pour les notifications en temps réel)
  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])
  }

  // Calculer le nombre de notifications non lues
  const unreadCount = notifications.filter((notif) => !notif.lue).length

  // Charger les notifications au chargement et quand l'utilisateur change
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchNotifications()
    } else {
      setNotifications([])
    }
  }, [isAuthenticated, user])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        error,
        markAsRead,
        fetchNotifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// Hook pour utiliser le contexte
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications doit être utilisé à l'intérieur d'un NotificationProvider")
  }
  return context
}
