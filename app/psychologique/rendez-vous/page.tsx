"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function RendezVousPsyPage() {
  const [date, setDate] = useState<Date>()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simuler un délai d'envoi
    toast({
      title: "Rendez-vous confirmé !",
      description: `Votre rendez-vous avec ${document.querySelector('input[name="psychologue"]:checked')?.id === "emilie-ntoutoume" ? "Dr. Émilie Ntoutoume" : document.querySelector('input[name="psychologue"]:checked')?.id === "marc-ondo" ? "Dr. Marc Ondo" : "Dr. Claire Mba"} a été programmé. Un email de confirmation vous a été envoyé.`,
      duration: 5000,
    })

    // Simuler l'ajout d'une notification
    setTimeout(() => {
      toast({
        title: "Notification ajoutée",
        description: "Une notification de rappel a été ajoutée à votre calendrier.",
        duration: 3000,
      })
    }, 2000)
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-10 space-y-4">
        <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
          <Heart className="h-10 w-10 text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold">Prendre Rendez-vous</h1>
        <p className="text-muted-foreground max-w-2xl">
          Planifiez une consultation avec l'un de nos psychologues partenaires
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Sélectionnez un psychologue</CardTitle>
            <CardDescription>Choisissez un psychologue spécialisé dans votre domaine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup defaultValue="emilie-ntoutoume">
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="emilie-ntoutoume" id="emilie-ntoutoume" name="psychologue" />
                <Label htmlFor="emilie-ntoutoume" className="flex-1 cursor-pointer">
                  <div className="font-medium">Dr. Émilie Ntoutoume</div>
                  <div className="text-sm text-muted-foreground">Traumatismes et SSPT</div>
                  <div className="text-xs text-muted-foreground">Lun, Mer, Ven: 9h-17h</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="marc-ondo" id="marc-ondo" name="psychologue" />
                <Label htmlFor="marc-ondo" className="flex-1 cursor-pointer">
                  <div className="font-medium">Dr. Marc Ondo</div>
                  <div className="text-sm text-muted-foreground">Thérapie familiale</div>
                  <div className="text-xs text-muted-foreground">Mar, Jeu: 8h-16h</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="claire-mba" id="claire-mba" name="psychologue" />
                <Label htmlFor="claire-mba" className="flex-1 cursor-pointer">
                  <div className="font-medium">Dr. Claire Mba</div>
                  <div className="text-sm text-muted-foreground">Anxiété et dépression</div>
                  <div className="text-xs text-muted-foreground">Lun, Mar, Jeu: 10h-18h</div>
                </Label>
              </div>
            </RadioGroup>
            <div className="pt-2">
              <Link href="/psychologique" className="text-sm text-pink-600 hover:underline">
                Voir tous les psychologues disponibles
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Choisissez une date et une heure</CardTitle>
            <CardDescription>Sélectionnez un créneau disponible</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Date du rendez-vous</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionnez une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Heure du rendez-vous</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une heure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9h00">9h00</SelectItem>
                  <SelectItem value="10h30">10h30</SelectItem>
                  <SelectItem value="12h00">12h00</SelectItem>
                  <SelectItem value="14h30">14h30</SelectItem>
                  <SelectItem value="16h00">16h00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type de consultation</Label>
              <Select defaultValue="presentiel">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presentiel">En présentiel</SelectItem>
                  <SelectItem value="video">Par vidéoconférence</SelectItem>
                  <SelectItem value="telephone">Par téléphone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>Veuillez fournir vos coordonnées et le motif de votre consultation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input id="nom" placeholder="Votre nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input id="prenom" placeholder="Votre prénom" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="votre.email@exemple.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input id="telephone" placeholder="Votre numéro de téléphone" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motif">Motif de la consultation</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un motif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anxiete">Anxiété</SelectItem>
                <SelectItem value="depression">Dépression</SelectItem>
                <SelectItem value="trauma">Traumatisme</SelectItem>
                <SelectItem value="couple">Problèmes de couple</SelectItem>
                <SelectItem value="famille">Problèmes familiaux</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Détails supplémentaires (facultatif)</Label>
            <Textarea
              id="details"
              placeholder="Veuillez fournir des détails supplémentaires sur votre situation pour aider le psychologue à se préparer"
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input type="checkbox" id="notifications" className="rounded border-gray-300" defaultChecked />
            <label htmlFor="notifications" className="text-sm">
              Recevoir des rappels de rendez-vous par email et notification
            </label>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              Toutes les informations fournies sont confidentielles et protégées par le secret professionnel.
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <Button variant="outline">Annuler</Button>
          <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleSubmit}>
            Confirmer le rendez-vous
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
