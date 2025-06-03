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
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import Link from "next/link"

export default function RendezVousPsyPage() {
  const [date, setDate] = useState<Date>()
  const { toast } = useToast()
  const [psychologists, setPsychologists] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    psychologistId: "",
    date: "",
    time: "",
    type: "presentiel",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motif: "",
    details: "",
    notifications: true,
  })

  useEffect(() => {
    setIsLoading(true)
    fetch("/api/professionals?type=psychologue")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger la liste des psychologues")
        return res.json()
      })
      .then((data) => {
        setPsychologists(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, psychologistId: value }))
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setFormData((prev) => ({ ...prev, date: selectedDate ? selectedDate.toISOString() : "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validation simple
    if (!formData.psychologistId || !formData.date || !formData.time || !formData.nom || !formData.prenom || !formData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        toast({
          title: "Rendez-vous confirmé !",
          description: data.message || "Votre rendez-vous a été enregistré. Un email de confirmation vous a été envoyé.",
        })
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue lors de la prise de rendez-vous.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de soumettre le rendez-vous.",
        variant: "destructive",
      })
    }
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
            {isLoading ? (
              <div className="text-center text-muted-foreground">Chargement des psychologues...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <RadioGroup value={formData.psychologistId} onValueChange={handleRadioChange}>
                {psychologists.map((psychologist: any) => (
                  <div key={psychologist.id} className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value={psychologist.id} id={psychologist.id} />
                    <Label htmlFor={psychologist.id} className="flex-1 cursor-pointer">
                      <div className="font-medium">{psychologist.name}</div>
                      <div className="text-sm text-muted-foreground">{psychologist.specialty}</div>
                      <div className="text-xs text-muted-foreground">{psychologist.availability}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
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
                  <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Heure du rendez-vous</Label>
              <Select value={formData.time} onValueChange={(v) => handleSelectChange("time", v)}>
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
              <Select value={formData.type} onValueChange={(v) => handleSelectChange("type", v)}>
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
              <Input name="nom" value={formData.nom} onChange={handleFormChange} id="nom" placeholder="Votre nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input name="prenom" value={formData.prenom} onChange={handleFormChange} id="prenom" placeholder="Votre prénom" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" value={formData.email} onChange={handleFormChange} id="email" type="email" placeholder="votre.email@exemple.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input name="telephone" value={formData.telephone} onChange={handleFormChange} id="telephone" placeholder="Votre numéro de téléphone" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motif">Motif de la consultation</Label>
            <Select value={formData.motif} onValueChange={(v) => handleSelectChange("motif", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un motif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anxiete">Anxiété</SelectItem>
                <SelectItem value="depression">Dépression</SelectItem>
                <SelectItem value="trauma">Traumatisme</SelectItem>
                <SelectItem value="couple">Problèmes de couple</SelectItem>
                <SelectItem value="famille">Problèmes familials</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Détails supplémentaires (facultatif)</Label>
            <Textarea
              name="details"
              value={formData.details}
              onChange={handleFormChange}
              id="details"
              placeholder="Veuillez fournir des détails supplémentaires sur votre situation pour aider le psychologue à se préparer"
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleFormChange}
              id="notifications"
              className="rounded border-gray-300"
              defaultChecked
            />
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
