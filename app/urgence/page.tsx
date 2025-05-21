"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Phone, MessageSquare, MapPin, Send, Plus, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UrgencePage() {
  const { toast } = useToast()
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "Police", number: "XXX", isDefault: true },
    { id: 2, name: "Ligne d'urgence Mod'Elles", number: "XXX-XXX-XXX", isDefault: true },
  ])
  const [newContact, setNewContact] = useState({ name: "", number: "" })

  const handleAddContact = () => {
    if (newContact.name && newContact.number) {
      setEmergencyContacts([
        ...emergencyContacts,
        {
          id: Date.now(),
          name: newContact.name,
          number: newContact.number,
          isDefault: false,
        },
      ])
      setNewContact({ name: "", number: "" })
      toast({
        title: "Contact ajouté",
        description: `${newContact.name} a été ajouté à vos contacts d'urgence.`,
      })
    } else {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir le nom et le numéro du contact",
        variant: "destructive",
      })
    }
  }

  const handleRemoveContact = (id: number) => {
    setEmergencyContacts(emergencyContacts.filter((contact) => contact.id !== id))
    toast({
      title: "Contact supprimé",
      description: "Le contact a été supprimé de vos contacts d'urgence.",
    })
  }

  const triggerEmergencyAlert = () => {
    // Déclencher la géolocalisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simuler l'envoi d'alerte avec les coordonnées
          toast({
            title: "Alerte d'urgence envoyée !",
            description: `Votre position (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(
              4,
            )}) a été partagée avec les services d'urgence et vos contacts.`,
            variant: "destructive",
          })

          // Simuler l'envoi de SMS aux contacts d'urgence
          setTimeout(() => {
            toast({
              title: "SMS envoyés à vos contacts d'urgence",
              description: `Alerte envoyée à ${emergencyContacts.length} contacts d'urgence.`,
            })
          }, 1500)

          // Simuler l'appel aux services d'urgence
          setTimeout(() => {
            toast({
              title: "Services d'urgence contactés",
              description: "Les services d'urgence ont été informés et une équipe est en route.",
            })
          }, 3000)
        },
        (error) => {
          toast({
            title: "Impossible d'obtenir votre position",
            description: "Veuillez autoriser l'accès à votre localisation pour cette fonctionnalité.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Géolocalisation non supportée",
        description: "Votre appareil ne supporte pas la géolocalisation.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-6 space-y-4">
        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold">Urgence</h1>
        <p className="text-muted-foreground max-w-2xl">
          Si vous êtes en danger immédiat, contactez immédiatement les services d'urgence.
        </p>
      </div>

      {/* Bouton d'alerte d'urgence en haut de la page */}
      <Card className="mb-8 border-2 border-red-500">
        <CardContent className="p-6">
          <Button
            className="w-full h-16 text-lg bg-red-600 hover:bg-red-700 flex items-center justify-center"
            onClick={triggerEmergencyAlert}
          >
            <Send className="mr-2 h-6 w-6" />
            DÉCLENCHER L'ALERTE D'URGENCE
          </Button>
          <p className="text-xs text-center mt-4 text-muted-foreground">
            Ce bouton envoie automatiquement votre position aux services d'urgence et à vos contacts enregistrés.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader className="bg-red-50 dark:bg-red-900/20">
            <CardTitle className="flex items-center text-red-700 dark:text-red-300">
              <Phone className="mr-2 h-5 w-5" />
              Numéros d'urgence
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Police</h3>
              <p className="text-2xl font-bold">XXX</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Ambulance</h3>
              <p className="text-2xl font-bold">XXX</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Ligne d'urgence Mod'Elles</h3>
              <p className="text-2xl font-bold">XXX-XXX-XXX</p>
              <p className="text-sm text-muted-foreground">Disponible 24h/24 et 7j/7</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader className="bg-red-50 dark:bg-red-900/20">
            <CardTitle className="flex items-center text-red-700 dark:text-red-300">
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat d'urgence
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              Discutez immédiatement avec un conseiller formé via notre chat d'urgence. Ce service est confidentiel et
              disponible 24h/24.
            </p>
            <Button className="w-full bg-red-600 hover:bg-red-700">Démarrer un chat d'urgence</Button>
          </CardContent>
        </Card>
      </div>

      {/* Section pour gérer les contacts d'urgence */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Mes contacts d'urgence</CardTitle>
          <CardDescription>
            Ajoutez les personnes à contacter en cas d'urgence. Elles recevront votre position et un message d'alerte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.number}</p>
                </div>
                {!contact.isDefault && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveContact(contact.id)}
                    className="text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Ajouter un nouveau contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  placeholder="Nom du contact"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Numéro</Label>
                <Input
                  id="number"
                  placeholder="Numéro de téléphone"
                  value={newContact.number}
                  onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleAddContact} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un contact
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Refuges d'urgence</CardTitle>
          <CardDescription>
            Si vous avez besoin d'un hébergement sécurisé immédiat, ces refuges peuvent vous accueillir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 text-pink-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Centre d'accueil Espoir</h3>
                <p className="text-sm text-muted-foreground">Libreville (adresse communiquée par téléphone)</p>
                <p className="text-sm font-medium mt-1">Tél: XXX-XXX-XXX</p>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 text-pink-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Refuge Sécurité</h3>
                <p className="text-sm text-muted-foreground">Port-Gentil (adresse communiquée par téléphone)</p>
                <p className="text-sm font-medium mt-1">Tél: XXX-XXX-XXX</p>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 text-pink-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Maison des Femmes</h3>
                <p className="text-sm text-muted-foreground">Franceville (adresse communiquée par téléphone)</p>
                <p className="text-sm font-medium mt-1">Tél: XXX-XXX-XXX</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Plan de sécurité</CardTitle>
          <CardDescription>
            Si vous êtes dans une relation abusive, il est important d'avoir un plan de sécurité.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4"></CardContent>
      </Card>
    </div>
  )
}
