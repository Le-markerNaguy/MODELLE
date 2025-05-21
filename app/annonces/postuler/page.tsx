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
import { ArrowLeft, Building, Calendar, MapPin, Upload } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function PostulerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const annonceId = searchParams.get("id")
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [annonce, setAnnonce] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    lettre: "",
    experience: "",
    linkedin: "",
    cv: null as File | null,
    acceptTerms: false,
    notifier: true,
  })

  // Simuler le chargement des données de l'API
  useState(() => {
    setIsLoading(true)

    // Dans une implémentation réelle, nous utiliserions l'API
    // api.get(`/annonces/${annonceId}`)
    //   .then(response => setAnnonce(response.data))
    //   .catch(err => setError("Impossible de charger les détails de l'offre d'emploi"))
    //   .finally(() => setIsLoading(false))

    // Simulation de données pour la démonstration
    setTimeout(() => {
      setAnnonce({
        id: annonceId || "1",
        titre: "Assistante Administrative",
        type: "emploi",
        description:
          "Nous recherchons une assistante administrative pour notre bureau à Libreville. La candidate idéale sera organisée, rigoureuse et possèdera d'excellentes compétences en communication.",
        entreprise: "Entreprise Partenaire",
        lieu: "Libreville, Gabon",
        date_publication: "15 mars 2024",
        date_limite: "15 avril 2024",
        type_contrat: "CDI",
        salaire: "Selon profil et expérience",
        competences: [
          "Maîtrise des outils bureautiques",
          "Excellente organisation",
          "Capacité à gérer plusieurs tâches simultanément",
          "Bonnes compétences en communication écrite et orale",
          "Français courant, anglais apprécié",
        ],
        image: "/placeholder.svg?height=300&width=600",
      })
      setIsLoading(false)
    }, 1000)
  }, [annonceId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, cv: e.target.files![0] }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.cv) {
      toast({
        title: "Erreur",
        description: "Veuillez télécharger votre CV pour continuer.",
        variant: "destructive",
      })
      return
    }

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
      // Envoi réel à l'API
      const formDataToSend = new FormData()
      formDataToSend.append('annonceId', annonceId || '')
      formDataToSend.append('nom', formData.nom)
      formDataToSend.append('prenom', formData.prenom)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('telephone', formData.telephone)
      formDataToSend.append('lettre', formData.lettre)
      formDataToSend.append('experience', formData.experience)
      formDataToSend.append('linkedin', formData.linkedin)
      formDataToSend.append('acceptTerms', formData.acceptTerms ? 'true' : 'false')
      formDataToSend.append('notifier', formData.notifier ? 'true' : 'false')
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv)
      }

      const res = await fetch('/api/announcements/apply', {
        method: 'POST',
        body: formDataToSend,
      })
      const data = await res.json()

      if (res.status === 201) {
        toast({
          title: "Candidature envoyée avec succès !",
          description: `Votre candidature pour le poste "${annonce?.titre}" a été envoyée. Vous recevrez un email de confirmation.`,
        })
        setTimeout(() => {
          router.push("/annonces")
        }, 2000)
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !annonce) {
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

  if (!annonce) return null

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/annonces" className="text-muted-foreground hover:text-foreground flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux annonces
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Postuler à l&apos;offre d&apos;emploi</CardTitle>
              <CardDescription>
                Complétez le formulaire ci-dessous pour postuler au poste de &quot;{annonce.titre}&quot;
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
                  <Label htmlFor="lettre">Lettre de motivation</Label>
                  <Textarea
                    id="lettre"
                    name="lettre"
                    value={formData.lettre}
                    onChange={handleChange}
                    placeholder="Présentez-vous et expliquez pourquoi vous êtes intéressé(e) par ce poste..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience professionnelle pertinente</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Décrivez brièvement votre expérience en lien avec ce poste..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">Profil LinkedIn (optionnel)</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://www.linkedin.com/in/votre-profil"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cv">CV (PDF, Word ou image)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="cv"
                      name="cv"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="flex-1"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById("cv")?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formats acceptés: PDF, Word, JPG, PNG. Taille max: 5 MB
                  </p>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleCheckboxChange("acceptTerms", !!checked)}
                  />
                  <Label htmlFor="acceptTerms" className="font-normal text-sm leading-tight">
                    J&apos;accepte que mes données personnelles soient traitées conformément à la politique de
                    confidentialité pour le traitement de ma candidature.
                  </Label>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="notifier"
                    checked={formData.notifier}
                    onCheckedChange={(checked) => handleCheckboxChange("notifier", !!checked)}
                  />
                  <Label htmlFor="notifier" className="font-normal text-sm leading-tight">
                    Je souhaite être notifié(e) des nouvelles offres d&apos;emploi similaires.
                  </Label>
                </div>

                <CardFooter className="px-0 pt-4">
                  <Button type="submit" className="w-full bg-modelles-600 hover:bg-modelles-700" disabled={isLoading}>
                    {isLoading ? "Envoi en cours..." : "Envoyer ma candidature"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Détails de l&apos;offre</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Emploi
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {annonce.type_contrat}
                </Badge>
              </div>

              <h3 className="font-semibold text-lg">{annonce.titre}</h3>
              <p className="text-muted-foreground text-sm">{annonce.description}</p>

              <Separator className="my-2" />

              <div className="space-y-3">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">{annonce.entreprise}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">{annonce.lieu}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-modelles-600" />
                  <span className="text-sm">Publié le {annonce.date_publication}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-sm text-red-500">Date limite: {annonce.date_limite}</span>
                </div>
              </div>

              <Separator className="my-2" />

              {annonce.competences && annonce.competences.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Compétences requises</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    {annonce.competences.map((competence: string, index: number) => (
                      <li key={index}>{competence}</li>
                    ))}
                  </ul>
                </div>
              )}

              {annonce.salaire && (
                <div className="bg-muted/30 p-3 rounded-md mt-4">
                  <p className="text-sm">
                    <span className="font-medium">Rémunération : </span>
                    {annonce.salaire}
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
