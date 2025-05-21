"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Calendar, MapPin, User, Users } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function GroupeInscriptionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const groupeId = searchParams.get("id")
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [groupe, setGroupe] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motivation: "",
    experience: "",
    attentes: "",
    confidentialite: false,
    notifications: true,
  })

  // Simuler le chargement des données de l'API
  useState(() => {
    setIsLoading(true)

    // Dans une implémentation réelle, nous utiliserions l'API
    // api.get(`/groupes/${groupeId}`)
    //   .then(response => setGroupe(response.data))
    //   .catch(err => setError("Impossible de charger les détails du groupe"))
    //   .finally(() => setIsLoading(false))

    // Simulation de données pour la démonstration
    setTimeout(() => {
      setGroupe({
        id: groupeId || "1",
        titre: "Survivantes de violences",
        description:
          "Un espace sécurisé pour les femmes ayant vécu des situations de violence. Ce groupe offre soutien, compréhension et outils pour la guérison et la reconstruction.",
        horaire: "Mardi, 18h-20h",
        date_debut: "15 avril 2024",
        date_fin: "17 juin 2024",
        duree: "10 séances",
        lieu: "Centre Mod'Elles, Libreville",
        facilitateur: "Dr. Sylvie Obame",
        places_max: 12,
        places_occupees: 8,
        image: "/placeholder.svg?height=300&width=600",
        thematiques: [
          "Comprendre les traumatismes et leurs effets",
          "Techniques de gestion des émotions",
          "Reconstruire l'estime de soi",
          "Établir des limites saines",
          "Développer des relations de confiance",
        ],
      })
      setIsLoading(false)
    }, 1000)
  }, [groupeId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!groupeId) {
      toast({
        title: "Erreur",
        description: "Aucun groupe sélectionné. Veuillez réessayer depuis la page des groupes.",
        variant: "destructive",
      })
      return
    }

    if (!formData.confidentialite) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les règles de confidentialité pour continuer.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Appel réel à l'API d'inscription au groupe
      const res = await fetch(`/api/support-groups/${groupeId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          motivation: formData.motivation,
          experience: formData.experience,
          attentes: formData.attentes,
          confidentialite: formData.confidentialite,
          notifications: formData.notifications,
        }),
      })
      const data = await res.json()

      if (res.status === 201) {
        toast({
          title: "Demande envoyée avec succès !",
          description: `Votre demande d'inscription au groupe "${groupe?.titre}" a été envoyée. Vous recevrez une réponse dans les prochains jours.`,
        })
        setTimeout(() => {
          router.push("/psychologique/groupes/confirmation")
        }, 2000)
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !groupe) {
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

  if (!groupe) return null

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux groupes de soutien
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Inscription au groupe de soutien</CardTitle>
              <CardDescription>
                Complétez le formulaire ci-dessous pour demander à rejoindre le groupe &quot;{groupe.titre}&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Processus d&apos;admission</AlertTitle>
                <AlertDescription>
                  Après l&apos;envoi de votre demande, la facilitatrice du groupe vous contactera pour un entretien
                  préalable afin de s&apos;assurer que le groupe correspond à vos besoins.
                </AlertDescription>
              </Alert>

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
                  <Label htmlFor="motivation">Pourquoi souhaitez-vous rejoindre ce groupe de soutien ?</Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Partagez vos motivations et ce qui vous amène à rejoindre ce groupe..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Avez-vous déjà participé à un groupe de soutien similaire ?</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Si oui, partagez brièvement votre expérience..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attentes">Quelles sont vos attentes concernant ce groupe ?</Label>
                  <Textarea
                    id="attentes"
                    name="attentes"
                    value={formData.attentes}
                    onChange={handleChange}
                    placeholder="Ce que vous espérez apprendre, partager ou accomplir..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="confidentialite"
                    checked={formData.confidentialite}
                    onCheckedChange={(checked) => handleCheckboxChange("confidentialite", !!checked)}
                  />
                  <Label htmlFor="confidentialite" className="font-normal text-sm leading-tight">
                    Je m&apos;engage à respecter la confidentialité du groupe et à ne pas partager les histoires
                    personnelles des autres participants en dehors des séances.
                  </Label>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => handleCheckboxChange("notifications", !!checked)}
                  />
                  <Label htmlFor="notifications" className="font-normal text-sm leading-tight">
                    Je souhaite recevoir des rappels par email avant chaque séance du groupe.
                  </Label>
                </div>

                <CardFooter className="px-0 pt-4">
                  <Button type="submit" className="w-full bg-modelles-600 hover:bg-modelles-700" disabled={isLoading}>
                    {isLoading ? "Traitement en cours..." : "Envoyer ma demande d'inscription"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Détails du groupe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-lg">{groupe.titre}</h3>
              <p className="text-muted-foreground text-sm">{groupe.description}</p>

              <Separator className="my-2" />

              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">{groupe.horaire}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">
                    Du {groupe.date_debut} au {groupe.date_fin}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">{groupe.lieu}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">Animé par {groupe.facilitateur}</span>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm font-medium">Places disponibles</p>
                <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-modelles-600 rounded-full"
                    style={{ width: `${(groupe.places_occupees / groupe.places_max) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Users className="h-3 w-3 inline mr-1" />
                  {groupe.places_max - groupe.places_occupees} places sur {groupe.places_max} disponibles
                </p>
              </div>

              {groupe.thematiques && groupe.thematiques.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Thématiques abordées</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    {groupe.thematiques.map((theme: string, index: number) => (
                      <li key={index}>{theme}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
