"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Heart, Clock, AlertCircle, Bell, Send, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminNotificationsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("send")
  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    type: "system",
    recipients: "all",
    specificUsers: "",
    scheduledDate: "",
    scheduledTime: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNotificationData({
      ...notificationData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNotificationData({
      ...notificationData,
      [name]: value,
    })
  }

  const handleSendNotification = () => {
    // Dans une application réelle, vous enverriez cette notification à votre API
    toast({
      title: "Notification envoyée",
      description: `La notification "${notificationData.title}" a été envoyée avec succès.`,
    })

    // Réinitialiser le formulaire
    setNotificationData({
      title: "",
      message: "",
      type: "system",
      recipients: "all",
      specificUsers: "",
      scheduledDate: "",
      scheduledTime: "",
    })
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gestion des notifications</h2>
      </div>

      <Tabs defaultValue="send" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Envoyer une notification</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Envoyer une notification</CardTitle>
              <CardDescription>Créez et envoyez une notification aux utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la notification</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Entrez le titre de la notification"
                  value={notificationData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Entrez le message de la notification"
                  rows={4}
                  value={notificationData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type de notification</Label>
                  <Select value={notificationData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">
                        <div className="flex items-center">
                          <Bell className="mr-2 h-4 w-4 text-gray-500" />
                          Système
                        </div>
                      </SelectItem>
                      <SelectItem value="appointment">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                          Rendez-vous
                        </div>
                      </SelectItem>
                      <SelectItem value="group">
                        <div className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-pink-500" />
                          Groupe
                        </div>
                      </SelectItem>
                      <SelectItem value="resource">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          Ressource
                        </div>
                      </SelectItem>
                      <SelectItem value="alert">
                        <div className="flex items-center">
                          <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                          Alerte
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipients">Destinataires</Label>
                  <Select
                    value={notificationData.recipients}
                    onValueChange={(value) => handleSelectChange("recipients", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez les destinataires" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les utilisateurs</SelectItem>
                      <SelectItem value="users">Utilisatrices uniquement</SelectItem>
                      <SelectItem value="professionals">Professionnels uniquement</SelectItem>
                      <SelectItem value="specific">Utilisateurs spécifiques</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {notificationData.recipients === "specific" && (
                <div className="space-y-2">
                  <Label htmlFor="specificUsers">Utilisateurs spécifiques</Label>
                  <Input
                    id="specificUsers"
                    name="specificUsers"
                    placeholder="Entrez les emails des utilisateurs séparés par des virgules"
                    value={notificationData.specificUsers}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">Exemple: user1@example.com, user2@example.com</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Date d'envoi (optionnel)</Label>
                  <Input
                    id="scheduledDate"
                    name="scheduledDate"
                    type="date"
                    value={notificationData.scheduledDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduledTime">Heure d'envoi (optionnel)</Label>
                  <Input
                    id="scheduledTime"
                    name="scheduledTime"
                    type="time"
                    value={notificationData.scheduledTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="bg-pink-600 hover:bg-pink-700"
                  onClick={handleSendNotification}
                  disabled={!notificationData.title || !notificationData.message}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {notificationData.scheduledDate ? "Programmer la notification" : "Envoyer la notification"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Modèles de notification</CardTitle>
              <CardDescription>Gérez vos modèles de notification prédéfinis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <NotificationTemplate
                    title="Rappel de rendez-vous"
                    message="Vous avez un rendez-vous demain à {heure} avec {professionnel}."
                    type="appointment"
                  />
                  <NotificationTemplate
                    title="Rappel de groupe"
                    message="La prochaine session du groupe '{groupe}' aura lieu {jour} à {heure}."
                    type="group"
                  />
                  <NotificationTemplate
                    title="Nouvelle ressource"
                    message="Une nouvelle ressource '{titre}' est maintenant disponible dans la section {section}."
                    type="resource"
                  />
                  <NotificationTemplate
                    title="Alerte importante"
                    message="Information importante concernant votre santé ou votre sécurité."
                    type="alert"
                  />
                  <NotificationTemplate
                    title="Mise à jour de la plateforme"
                    message="Mod'Elles a été mis à jour avec de nouvelles fonctionnalités. Découvrez-les dès maintenant !"
                    type="system"
                  />
                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-full">
                    <Button variant="ghost" className="h-auto">
                      <Plus className="h-6 w-6 mb-2" />
                      <span>Créer un nouveau modèle</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Configurez les paramètres généraux des notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications automatiques de rendez-vous</Label>
                    <p className="text-sm text-muted-foreground">Envoyer automatiquement des rappels de rendez-vous</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="24">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Délai de rappel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 heure avant</SelectItem>
                        <SelectItem value="3">3 heures avant</SelectItem>
                        <SelectItem value="24">24 heures avant</SelectItem>
                        <SelectItem value="48">48 heures avant</SelectItem>
                        <SelectItem value="disabled">Désactivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications automatiques de groupe</Label>
                    <p className="text-sm text-muted-foreground">Envoyer automatiquement des rappels de groupe</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="24">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Délai de rappel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 heure avant</SelectItem>
                        <SelectItem value="3">3 heures avant</SelectItem>
                        <SelectItem value="24">24 heures avant</SelectItem>
                        <SelectItem value="48">48 heures avant</SelectItem>
                        <SelectItem value="disabled">Désactivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications de nouvelles ressources</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer automatiquement des notifications pour les nouvelles ressources
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="enabled">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="État" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Activé</SelectItem>
                        <SelectItem value="disabled">Désactivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Limite de notifications par jour</Label>
                    <p className="text-sm text-muted-foreground">
                      Nombre maximum de notifications envoyées à un utilisateur par jour
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Limite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 notifications</SelectItem>
                        <SelectItem value="5">5 notifications</SelectItem>
                        <SelectItem value="10">10 notifications</SelectItem>
                        <SelectItem value="unlimited">Illimité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button className="bg-pink-600 hover:bg-pink-700">Enregistrer les paramètres</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationTemplate({ title, message, type }: { title: string; message: string; type: string }) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "group":
        return <Heart className="h-5 w-5 text-pink-500" />
      case "resource":
        return <FileText className="h-5 w-5 text-green-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{getNotificationIcon(type)}</div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm">
              Utiliser
            </Button>
            <Button variant="ghost" size="sm">
              Modifier
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
