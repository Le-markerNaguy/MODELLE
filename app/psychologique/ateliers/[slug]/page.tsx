"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Clock, User, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AtelierInscriptionPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    experience: "debutant",
    acceptTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [workshop, setWorkshop] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/workshops/${params.slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement de l'atelier")
        return res.json()
      })
      .then((data) => {
        setWorkshop(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [params.slug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, experience: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      toast({
        title: "Inscription confirmée !",
        description: `Votre place pour l'atelier "${workshop.title}" a été réservée.`,
      })
      setIsSubmitting(false)
      // Dans une application réelle, vous redirigeriez vers une page de confirmation
    }, 1500)
  }

  if (loading) return <div className="p-10 text-center">Chargement...</div>
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>
  if (!workshop) return null

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground mr-2">
          Soutien Psychologique
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground mr-2">
          Ateliers de Bien-être
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <span>{workshop.title}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="relative h-[200px] rounded-lg overflow-hidden mb-6">
            <Image src={workshop.imageUrl || "/placeholder.svg"} fill alt={workshop.title} className="object-cover" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{workshop.title}</CardTitle>
              <CardDescription>Atelier de bien-être</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{workshop.description}</p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{workshop.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{workshop.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{workshop.location}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Animé par {workshop.facilitator}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {workshop.currentParticipants}/{workshop.maxParticipants} participants
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-medium mb-2">Ce que vous apprendrez :</h3>
                <ul className="space-y-1 list-disc pl-5 text-sm text-muted-foreground">
                  {workshop.benefits && workshop.benefits.map((benefit: any, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-2">Conditions requises :</h3>
                <ul className="space-y-1 list-disc pl-5 text-sm text-muted-foreground">
                  {workshop.requirements && workshop.requirements.map((requirement: any, index: number) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Inscription à l'atelier</h2>
          <p className="text-muted-foreground mb-6">
            Remplissez le formulaire ci-dessous pour vous inscrire à cet atelier.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="block w-full p-3 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className="block w-full p-3 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full p-3 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium mb-1">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                id="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="block w-full p-3 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Niveau d'expérience</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleRadioChange("debutant")}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                    formData.experience === "debutant"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-muted-foreground text-muted-foreground"
                  }`}
                >
                  Débutant
                </button>
                <button
                  type="button"
                  onClick={() => handleRadioChange("intermediaire")}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                    formData.experience === "intermediaire"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-muted-foreground text-muted-foreground"
                  }`}
                >
                  Intermédiaire
                </button>
                <button
                  type="button"
                  onClick={() => handleRadioChange("avance")}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                    formData.experience === "avance"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-muted-foreground text-muted-foreground"
                  }`}
                >
                  Avancé
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <label htmlFor="acceptTerms" className="ml-2 text-sm text-muted-foreground">
                J'accepte les{" "}
                <Link href="/termes" className="text-blue-500 hover:underline">
                  termes et conditions
                </Link>{" "}
                de l'atelier.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-semibold transition-all flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSubmitting ? "Enregistrement..." : "S'inscrire à l'atelier"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
