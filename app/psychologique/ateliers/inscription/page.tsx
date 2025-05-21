"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function AtelierInscriptionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const atelierId = searchParams.get("id")
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [atelier, setAtelier] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    experience: "debutant",
    raisons: "",
    besoins: "",
    acceptTerms: false,
  })

  // Simuler le chargement des données de l'API
  useState(() => {
    setIsLoading(true)

    // Dans une implémentation réelle, nous utiliserions l'API
    // api.get(`/ateliers/${atelierId}`)
    //   .then(response => setAtelier(response.data))
    //   .catch(err => setError("Impossible de charger les détails de l'atelier"))
    //   .finally(() => setIsLoading(false))

    // Simulation de données pour la démonstration
    setTimeout(() => {
      setAtelier({
        id: atelierId || "1",
        titre: "Gestion du stress et relaxation",
        description:
          "Cet atelier pratique vous apprendra des techniques efficaces pour gérer le stress quotidien et favoriser la relaxation.",
        date: "18 avril 2024",
        heure: "14h00 - 17h00",
        lieu: "Centre Mod'Elles, Libreville",
        animateur: "Dr. Claire Mba",
        prix: "Gratuit",
        places_max: 15,
        places_restantes: 7,
        image: "/placeholder.svg?height=300&width=600",
      })
      setIsLoading(false)
    }, 1000)
  }, [atelierId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, experience: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les conditions générales pour continuer.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Dans une implémentation réelle, nous enverrions les données à l'API
      // await api.post('/inscriptions/ateliers', {
      //   atelierId,
      //   ...formData
      // })

      // Simulation pour la démonstration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Inscription confirmée !",
        description: `Votre place pour l'atelier "${atelier?.titre}" a été réservée.`,
      })

      // Redirection après un court délai
      setTimeout(() => {
        router.push("/psychologique")
      }, 2000)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !atelier) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse space-y-4 w-full max-w-2xl">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-8 bg-muted rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-red-500">Erreur</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button className="mt-4" onClick={() => router.back()}>
              Retour
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!atelier) return null

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux ateliers
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Inscription à l&apos;atelier</CardTitle>
              <CardDescription>
                Complétez le formulaire ci-dessous pour vous inscrire à l&apos;atelier &quot;{atelier.titre}&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Niveau d&apos;expérience avec le sujet</Label>
                  <RadioGroup
                    value={formData.experience}
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debutant" id="debutant" />
                      <Label htmlFor="debutant" className="font-normal">
                        Débutant - Je découvre le sujet
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediaire" id="intermediaire" />
                      <Label htmlFor="intermediaire" className="font-normal">
                        Intermédiaire - J&apos;ai quelques connaissances
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="avance" id="avance" />
                      <Label htmlFor="avance" className="font-normal">
                        Avancé - Je pratique déjà régulièrement
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="raisons">Pourquoi souhaitez-vous participer à cet atelier ?</Label>
                  <Textarea
                    id="raisons"
                    name="raisons"
                    value={formData.raisons}
                    onChange={handleChange}
                    placeholder="Partagez vos motivations..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="besoins">Avez-vous des besoins particuliers ou des questions ?</Label>
                  <Textarea
                    id="besoins"
                    name="besoins"
                    value={formData.besoins}
                    onChange={handleChange}
                    placeholder="Besoins spécifiques, accommodations, questions..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox id="acceptTerms" checked={formData.acceptTerms} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="acceptTerms" className="font-normal text-sm leading-tight">
                    J&apos;accepte les conditions générales et la politique de confidentialité. Je comprends que mes
                    données personnelles seront utilisées uniquement dans le cadre de cette inscription.
                  </Label>
                </div>

                <CardFooter className="px-0 pt-4">
                  <Button type="submit" className="w-full bg-modelles-600 hover:bg-modelles-700" disabled={isLoading}>
                    {isLoading ? "Traitement en cours..." : "Confirmer mon inscription"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Détails de l&apos;atelier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-lg">{atelier.titre}</h3>
              <p className="text-muted-foreground text-sm">{atelier.description}</p>

              <Separator className="my-2" />

              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">{atelier.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">{atelier.heure}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">{atelier.lieu}</span>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm font-medium">Places disponibles</p>
                <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-modelles-600 rounded-full"
                    style={{
                      width: `${((atelier.places_max - atelier.places_restantes) / atelier.places_max) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {atelier.places_restantes} places sur {atelier.places_max} disponibles
                </p>
              </div>

              {atelier.prix && (
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Prix : </span>
                    {atelier.prix}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
