"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, Calendar, Heart, Clock, AlertCircle, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NotificationPreferencesPage() {
  const { toast } = useToast()
  const [preferences, setPreferences] = useState({
    // Notifications par type
    appointmentNotifications: true,
    groupNotifications: true,
    resourceNotifications: true,
    alertNotifications: true,
    systemNotifications: true,

    // Méthodes de notification
    inAppNotifications: true,
    emailNotifications: true,

    // Rappels de rendez-vous
    appointmentReminders: true,
    appointmentReminderTime: "24",

    // Rappels de groupe
    groupReminders: true,
    groupReminderTime: "24",

    // Notifications de ressources
    newResourceNotifications: true,
    resourceRecommendations: true,

    // Notifications d'urgence
    emergencyAlerts: true,
  })

  const handleToggleChange = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    })
  }

  const handleSelectChange = (key: keyof typeof preferences, value: string) => {
    setPreferences({
      ...preferences,
      [key]: value,
    })
  }

  const handleSavePreferences = () => {
    // Dans une application réelle, vous enverriez ces préférences à votre API
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de notification ont été mises à jour avec succès.",
    })
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-10 space-y-4">
        <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
          <Bell className="h-10 w-10 text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold">Préférences de notification</h1>
        <p className="text-muted-foreground max-w-2xl">
          Personnalisez les notifications que vous souhaitez recevoir et comment vous souhaitez les recevoir
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Méthodes de notification</CardTitle>
            <CardDescription>Choisissez comment vous souhaitez recevoir vos notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications dans l'application</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications dans l'interface de l'application
                </p>
              </div>
              <Switch
                checked={preferences.inAppNotifications}
                onCheckedChange={() => handleToggleChange("inAppNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Notifications par email</Label>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={() => handleToggleChange("emailNotifications")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Types de notifications</CardTitle>
            <CardDescription>Choisissez les types de notifications que vous souhaitez recevoir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Rendez-vous</Label>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Notifications concernant vos rendez-vous médicaux et psychologiques
                </p>
              </div>
              <Switch
                checked={preferences.appointmentNotifications}
                onCheckedChange={() => handleToggleChange("appointmentNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Groupes de soutien</Label>
                  <Heart className="h-4 w-4 text-pink-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Notifications concernant vos groupes de soutien et ateliers
                </p>
              </div>
              <Switch
                checked={preferences.groupNotifications}
                onCheckedChange={() => handleToggleChange("groupNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Ressources</Label>
                  <Clock className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Notifications concernant les nouvelles ressources et recommandations
                </p>
              </div>
              <Switch
                checked={preferences.resourceNotifications}
                onCheckedChange={() => handleToggleChange("resourceNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Alertes</Label>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Alertes importantes concernant votre santé ou votre sécurité
                </p>
              </div>
              <Switch
                checked={preferences.alertNotifications}
                onCheckedChange={() => handleToggleChange("alertNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Système</Label>
                  <Bell className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Notifications concernant les mises à jour de la plateforme et votre compte
                </p>
              </div>
              <Switch
                checked={preferences.systemNotifications}
                onCheckedChange={() => handleToggleChange("systemNotifications")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rappels de rendez-vous</CardTitle>
            <CardDescription>Configurez les rappels pour vos rendez-vous</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Activer les rappels de rendez-vous</Label>
                <p className="text-sm text-muted-foreground">Recevoir des rappels avant vos rendez-vous</p>
              </div>
              <Switch
                checked={preferences.appointmentReminders}
                onCheckedChange={() => handleToggleChange("appointmentReminders")}
              />
            </div>
            {preferences.appointmentReminders && (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Délai de rappel</Label>
                  <p className="text-sm text-muted-foreground">
                    Combien de temps à l'avance souhaitez-vous être rappelé ?
                  </p>
                </div>
                <Select
                  value={preferences.appointmentReminderTime}
                  onValueChange={(value) => handleSelectChange("appointmentReminderTime", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionner un délai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 heure avant</SelectItem>
                    <SelectItem value="3">3 heures avant</SelectItem>
                    <SelectItem value="24">24 heures avant</SelectItem>
                    <SelectItem value="48">48 heures avant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rappels de groupe</CardTitle>
            <CardDescription>Configurez les rappels pour vos groupes de soutien</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Activer les rappels de groupe</Label>
                <p className="text-sm text-muted-foreground">Recevoir des rappels avant les sessions de groupe</p>
              </div>
              <Switch
                checked={preferences.groupReminders}
                onCheckedChange={() => handleToggleChange("groupReminders")}
              />
            </div>
            {preferences.groupReminders && (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Délai de rappel</Label>
                  <p className="text-sm text-muted-foreground">
                    Combien de temps à l'avance souhaitez-vous être rappelé ?
                  </p>
                </div>
                <Select
                  value={preferences.groupReminderTime}
                  onValueChange={(value) => handleSelectChange("groupReminderTime", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionner un délai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 heure avant</SelectItem>
                    <SelectItem value="3">3 heures avant</SelectItem>
                    <SelectItem value="24">24 heures avant</SelectItem>
                    <SelectItem value="48">48 heures avant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications de ressources</CardTitle>
            <CardDescription>Configurez les notifications pour les ressources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Nouvelles ressources</Label>
                <p className="text-sm text-muted-foreground">
                  Être notifiée lorsque de nouvelles ressources sont ajoutées
                </p>
              </div>
              <Switch
                checked={preferences.newResourceNotifications}
                onCheckedChange={() => handleToggleChange("newResourceNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Recommandations personnalisées</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des recommandations de ressources basées sur votre profil
                </p>
              </div>
              <Switch
                checked={preferences.resourceRecommendations}
                onCheckedChange={() => handleToggleChange("resourceRecommendations")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications d'urgence</CardTitle>
            <CardDescription>Configurez les notifications d'urgence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertes d'urgence</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des alertes en cas d'urgence ou de situation critique
                </p>
              </div>
              <Switch
                checked={preferences.emergencyAlerts}
                onCheckedChange={() => handleToggleChange("emergencyAlerts")}
              />
            </div>
            {preferences.emergencyAlerts && (
              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-300">
                  <strong>Important :</strong> Les alertes d'urgence ne peuvent pas être complètement désactivées pour
                  des raisons de sécurité. Même si vous désactivez cette option, vous recevrez toujours les alertes
                  critiques concernant votre sécurité.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleSavePreferences}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer les préférences
          </Button>
        </div>
      </div>
    </div>
  )
}
