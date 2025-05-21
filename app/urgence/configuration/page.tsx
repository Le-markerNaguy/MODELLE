"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Settings, Bell, Phone, Shield, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function UrgenceConfigurationPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    alertMessage: "Je suis en danger. Voici ma position actuelle. Veuillez contacter les autorités.",
    sendLocation: true,
    sendAudio: true,
    audioLength: 30,
    alertTrigger: "button",
    alertSound: true,
    vibration: true,
    autoCall: true,
    primaryContact: "police",
  })

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos paramètres d'alerte d'urgence ont été mis à jour.",
    })
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-10 space-y-4">
        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
          <Settings className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold">Configuration du système d'alerte</h1>
        <p className="text-muted-foreground max-w-2xl">
          Personnalisez les paramètres de votre système d'alerte d'urgence pour qu'il réponde à vos besoins spécifiques.
        </p>
      </div>

      <div className="grid gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-red-600" />
              Paramètres de l'alerte
            </CardTitle>
            <CardDescription>Configurez comment l'alerte sera déclenchée et envoyée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="alert-message">Message d'alerte</Label>
              <Textarea
                id="alert-message"
                value={settings.alertMessage}
                onChange={(e) => setSettings({ ...settings, alertMessage: e.target.value })}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Ce message sera envoyé à vos contacts d'urgence avec votre position actuelle.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="send-location">Partager ma position</Label>
                <p className="text-xs text-muted-foreground">Envoyer automatiquement vos coordonnées GPS</p>
              </div>
              <Switch
                id="send-location"
                checked={settings.sendLocation}
                onCheckedChange={(checked) => setSettings({ ...settings, sendLocation: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="send-audio">Enregistrer et envoyer l'audio</Label>
                <p className="text-xs text-muted-foreground">
                  Enregistrer automatiquement l'audio ambiant et l'envoyer avec l'alerte
                </p>
              </div>
              <Switch
                id="send-audio"
                checked={settings.sendAudio}
                onCheckedChange={(checked) => setSettings({ ...settings, sendAudio: checked })}
              />
            </div>

            {settings.sendAudio && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="audio-length">Durée de l'enregistrement audio</Label>
                  <span className="text-sm font-medium">{settings.audioLength} secondes</span>
                </div>
                <Slider
                  id="audio-length"
                  min={10}
                  max={60}
                  step={5}
                  value={[settings.audioLength]}
                  onValueChange={(value) => setSettings({ ...settings, audioLength: value[0] })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="alert-trigger">Méthode de déclenchement de l'alerte</Label>
              <Select
                value={settings.alertTrigger}
                onValueChange={(value) => setSettings({ ...settings, alertTrigger: value })}
              >
                <SelectTrigger id="alert-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="button">Bouton d'urgence</SelectItem>
                  <SelectItem value="shake">Secouez l'appareil</SelectItem>
                  <SelectItem value="code">Code secret</SelectItem>
                  <SelectItem value="voice">Commande vocale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {settings.alertTrigger === "code" && (
              <div className="space-y-2">
                <Label htmlFor="secret-code">Code secret</Label>
                <Input id="secret-code" type="password" placeholder="Entrez un code secret" />
                <p className="text-xs text-muted-foreground">
                  Ce code peut être saisi rapidement pour déclencher l'alerte sans attirer l'attention.
                </p>
              </div>
            )}

            {settings.alertTrigger === "voice" && (
              <div className="space-y-2">
                <Label htmlFor="voice-command">Commande vocale</Label>
                <Input id="voice-command" placeholder="Ex: Aide-moi" />
                <p className="text-xs text-muted-foreground">
                  Prononcez cette phrase pour déclencher l'alerte (nécessite que l'application soit active).
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-red-600" />
              Paramètres de notification
            </CardTitle>
            <CardDescription>Configurez comment vous serez notifié lors du déclenchement de l'alerte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="alert-sound">Son d'alerte</Label>
                <p className="text-xs text-muted-foreground">Émettre un son lors du déclenchement de l'alerte</p>
              </div>
              <Switch
                id="alert-sound"
                checked={settings.alertSound}
                onCheckedChange={(checked) => setSettings({ ...settings, alertSound: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="vibration">Vibration</Label>
                <p className="text-xs text-muted-foreground">
                  Faire vibrer l'appareil lors du déclenchement de l'alerte
                </p>
              </div>
              <Switch
                id="vibration"
                checked={settings.vibration}
                onCheckedChange={(checked) => setSettings({ ...settings, vibration: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-call">Appel automatique</Label>
                <p className="text-xs text-muted-foreground">
                  Appeler automatiquement votre contact principal après le déclenchement de l'alerte
                </p>
              </div>
              <Switch
                id="auto-call"
                checked={settings.autoCall}
                onCheckedChange={(checked) => setSettings({ ...settings, autoCall: checked })}
              />
            </div>

            {settings.autoCall && (
              <div className="space-y-2">
                <Label htmlFor="primary-contact">Contact principal à appeler</Label>
                <Select
                  value={settings.primaryContact}
                  onValueChange={(value) => setSettings({ ...settings, primaryContact: value })}
                >
                  <SelectTrigger id="primary-contact">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="police">Police (XXX)</SelectItem>
                    <SelectItem value="modelles">Ligne d'urgence Mod'Elles (XXX-XXX-XXX)</SelectItem>
                    <SelectItem value="contact1">Marie Dupont (XXX-XXX-XXX)</SelectItem>
                    <SelectItem value="contact2">Jean Kouassi (XXX-XXX-XXX)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-red-600" />
              Paramètres de confidentialité
            </CardTitle>
            <CardDescription>Configurez les paramètres de confidentialité de votre système d'alerte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="stealth-mode">Mode discret</Label>
                <p className="text-xs text-muted-foreground">
                  L'application fonctionnera en arrière-plan sans notification visible
                </p>
              </div>
              <Switch id="stealth-mode" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="disguise-app">Déguiser l'application</Label>
                <p className="text-xs text-muted-foreground">
                  L'application apparaîtra comme une calculatrice ou un autre outil banal
                </p>
              </div>
              <Switch id="disguise-app" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-deletion">Suppression automatique des données</Label>
                <p className="text-xs text-muted-foreground">
                  Supprimer automatiquement les données sensibles après l'envoi de l'alerte
                </p>
              </div>
              <Switch id="data-deletion" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button variant="outline" asChild>
          <Link href="/urgence">Retour</Link>
        </Button>
        <Button className="bg-red-600 hover:bg-red-700" onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer les paramètres
        </Button>
      </div>

      <div className="mt-10 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-600">Important</h3>
            <p className="text-sm text-muted-foreground">
              Testez régulièrement votre système d'alerte pour vous assurer qu'il fonctionne correctement. Familiarisez
              vos contacts d'urgence avec le système pour qu'ils sachent comment réagir en cas d'alerte.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
