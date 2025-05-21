"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Heart, Clock, AlertCircle, Search, Check, Trash, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Notification } from "@/types/notification"
import { format, formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"

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
  {
    id: "6",
    title: "Nouvelle ressource sur la santé mentale",
    message: "Un nouvel article sur les techniques de relaxation est disponible dans la section Soutien Psychologique.",
    type: "resource",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // il y a 4 jours
    link: "/psychologique",
  },
  {
    id: "7",
    title: "Rappel de groupe",
    message: "Le groupe 'Estime de soi et confiance' se réunira lundi prochain à 17h.",
    type: "group",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 120), // il y a 5 jours
    link: "/psychologique/groupes/estime-de-soi-et-confiance",
  },
  {
    id: "8",
    title: "Mise à jour de la plateforme",
    message: "Mod'Elles a été mis à jour avec de nouvelles fonctionnalités. Découvrez-les dès maintenant !",
    type: "system",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 144), // il y a 6 jours
    link: "/",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNotifications = notifications.filter((notification) => {
    // Filtrer par type si ce n'est pas "all"
    const typeMatch = activeTab === "all" || notification.type === activeTab

    // Filtrer par terme de recherche
    const searchMatch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    return typeMatch && searchMatch
  })

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

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const deleteAllNotifications = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "group":
        return <Heart className="h-5 w-5 text-pink-500" />
      case "resource":
        return <Clock className="h-5 w-5 text-green-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case "appointment":
        return "Rendez-vous"
      case "group":
        return "Groupe"
      case "resource":
        return "Ressource"
      case "alert":
        return "Alerte"
      case "system":
        return "Système"
      default:
        return type
    }
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-10 space-y-4">
        <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
          <Bell className="h-10 w-10 text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold">Mes notifications</h1>
        <p className="text-muted-foreground max-w-2xl">
          Restez informée des rendez-vous, groupes de soutien et nouvelles ressources
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les notifications..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none"
            onClick={markAllAsRead}
            disabled={!notifications.some((n) => !n.read)}
          >
            <Check className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none"
            onClick={deleteAllNotifications}
            disabled={notifications.length === 0}
          >
            <Trash className="mr-2 h-4 w-4" />
            Tout supprimer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="appointment">Rendez-vous</TabsTrigger>
          <TabsTrigger value="group">Groupes</TabsTrigger>
          <TabsTrigger value="resource">Ressources</TabsTrigger>
          <TabsTrigger value="alert">Alertes</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                {filteredNotifications.length === 0
                  ? "Aucune notification pour le moment"
                  : `${filteredNotifications.length} notification${filteredNotifications.length > 1 ? "s" : ""}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${!notification.read ? "bg-muted/50" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                            <div className="flex flex-col sm:items-end gap-1">
                              <Badge variant="outline" className="w-fit">
                                {getNotificationTypeLabel(notification.type)}
                              </Badge>
                              <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(notification.date, { addSuffix: true, locale: fr })}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(notification.date, "dd MMMM yyyy, HH:mm", { locale: fr })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            {notification.link && (
                              <Button asChild variant="link" className="p-0 h-auto">
                                <Link href={notification.link}>Voir les détails</Link>
                              </Button>
                            )}
                            <div className="flex items-center gap-2 ml-auto">
                              {!notification.read && (
                                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                  <Check className="mr-2 h-4 w-4" />
                                  Marquer comme lu
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <p className="mt-2 text-muted-foreground">Aucune notification pour le moment</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
