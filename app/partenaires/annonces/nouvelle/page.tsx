"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Check, ChevronLeft, Clock, Info, Loader2, Eye, MapPin } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function NouvelleAnnoncePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [annonceType, setAnnonceType] = useState<string>("formation")
  const [titre, setTitre] = useState("")
  const [description, setDescription] = useState("")
  const [lieu, setLieu] = useState("")
  const [dateDebut, setDateDebut] = useState<Date>()
  const [dateFin, setDateFin] = useState<Date>()
  const [dateExpiration, setDateExpiration] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'envoi des données
    setTimeout(() => {
      setIsSubmitting(false)
      // Rediriger vers la liste des annonces
      router.push("/partenaires/annonces")
    }, 1500)
  }

  const isFormValid = () => {
    return titre && description && lieu && dateDebut
  }

  return (
    <div className="container py-10 max-w-5xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/partenaires/annonces">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour aux annonces
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Créer une nouvelle annonce</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Détails de l&apos;annonce</TabsTrigger>
          <TabsTrigger value="content" disabled={!titre || !annonceType}>
            Contenu
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!isFormValid()}>
            Aperçu et publication
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Renseignez les informations de base de votre annonce</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type d&apos;annonce</Label>
                <Select value={annonceType} onValueChange={setAnnonceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type d'annonce" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formation">Formation</SelectItem>
                    <SelectItem value="emploi">Offre d&apos;emploi</SelectItem>
                    <SelectItem value="evenement">Événement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="titre">Titre de l&apos;annonce</Label>
                <Input
                  id="titre"
                  placeholder="Ex: Formation en Entrepreneuriat Féminin"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description courte</Label>
                <Textarea
                  id="description"
                  placeholder="Une brève description de votre annonce (visible dans les listes)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lieu">Lieu</Label>
                <Input
                  id="lieu"
                  placeholder="Ex: Centre Mod'Elles, Libreville"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateDebut && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateDebut ? format(dateDebut, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateDebut} onSelect={setDateDebut} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {annonceType !== "emploi" && (
                  <div className="space-y-2">
                    <Label>Date de fin</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateFin && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFin ? format(dateFin, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateFin}
                          onSelect={setDateFin}
                          disabled={(date) => (dateDebut ? date < dateDebut : false)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Date d&apos;expiration de l&apos;annonce</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateExpiration && "text-muted-foreground",
                      )}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {dateExpiration ? (
                        format(dateExpiration, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionner une date d&apos;expiration</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateExpiration}
                      onSelect={setDateExpiration}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-muted-foreground">
                  L&apos;annonce ne sera plus visible sur le site après cette date.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/partenaires/annonces">Annuler</Link>
              </Button>
              <Button onClick={() => setActiveTab("content")} disabled={!titre || !annonceType}>
                Continuer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Contenu détaillé</CardTitle>
              <CardDescription>Ajoutez les détails spécifiques à votre annonce</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {annonceType === "formation" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="objectifs">Objectifs de la formation</Label>
                    <Textarea id="objectifs" placeholder="Quels sont les objectifs de cette formation?" rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="programme">Programme détaillé</Label>
                    <Textarea id="programme" placeholder="Décrivez le programme de la formation" rows={6} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prerequis">Prérequis</Label>
                    <Textarea
                      id="prerequis"
                      placeholder="Y a-t-il des prérequis pour participer à cette formation?"
                      rows={2}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="places">Nombre de places disponibles</Label>
                      <Input id="places" type="number" placeholder="Ex: 15" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prix">Prix</Label>
                      <Input id="prix" placeholder="Ex: Gratuit (financé par nos partenaires)" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="formateurs">Formateurs</Label>
                    <Textarea
                      id="formateurs"
                      placeholder="Informations sur les formateurs (noms, qualifications, expérience)"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {annonceType === "emploi" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="missions">Missions principales</Label>
                    <Textarea id="missions" placeholder="Décrivez les principales missions du poste" rows={4} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profil">Profil recherché</Label>
                    <Textarea id="profil" placeholder="Décrivez le profil et les compétences recherchés" rows={4} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contrat">Type de contrat</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de contrat" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cdi">CDI</SelectItem>
                          <SelectItem value="cdd">CDD</SelectItem>
                          <SelectItem value="stage">Stage</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="alternance">Alternance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Expérience requise</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un niveau d'expérience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debutant">Débutant</SelectItem>
                          <SelectItem value="junior">Junior (1-3 ans)</SelectItem>
                          <SelectItem value="intermediaire">Intermédiaire (3-5 ans)</SelectItem>
                          <SelectItem value="senior">Senior (5+ ans)</SelectItem>
                          <SelectItem value="expert">Expert (10+ ans)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="remuneration">Rémunération</Label>
                      <Input id="remuneration" placeholder="Ex: Selon profil" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avantages">Avantages</Label>
                      <Input id="avantages" placeholder="Ex: Mutuelle, tickets restaurant, etc." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Modalités de travail</Label>
                    <RadioGroup defaultValue="presentiel">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="presentiel" id="presentiel" />
                        <Label htmlFor="presentiel">Présentiel</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="teletravail" id="teletravail" />
                        <Label htmlFor="teletravail">Télétravail</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hybride" id="hybride" />
                        <Label htmlFor="hybride">Hybride</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}

              {annonceType === "evenement" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="programme">Programme de l&apos;événement</Label>
                    <Textarea id="programme" placeholder="Décrivez le programme détaillé de l'événement" rows={6} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="horaires">Horaires</Label>
                      <Input id="horaires" placeholder="Ex: 9h00 - 17h00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="places">Nombre de places disponibles</Label>
                      <Input id="places" type="number" placeholder="Ex: 50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="intervenants">Intervenants</Label>
                    <Textarea
                      id="intervenants"
                      placeholder="Informations sur les intervenants (noms, qualifications, organisations)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tarif">Tarif</Label>
                    <Input id="tarif" placeholder="Ex: Gratuit sur inscription" />
                  </div>

                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="inscription" />
                        <Label htmlFor="inscription">Inscription obligatoire</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="streaming" />
                        <Label htmlFor="streaming">Diffusion en ligne</Label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="contact">Informations de contact</Label>
                <Textarea
                  id="contact"
                  placeholder="Comment les candidates peuvent vous contacter pour plus d'informations"
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("details")}>
                Retour
              </Button>
              <Button onClick={() => setActiveTab("preview")} disabled={!isFormValid()}>
                Continuer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu et publication</CardTitle>
              <CardDescription>Vérifiez votre annonce avant de la publier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-2"
                >
                  {previewMode ? (
                    <>
                      <Info className="h-4 w-4" />
                      Voir les détails
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Voir l&apos;aperçu
                    </>
                  )}
                </Button>
              </div>

              {previewMode ? (
                <div className="border rounded-lg p-6">
                  <div className="mb-4">
                    <Badge
                      className={
                        annonceType === "formation"
                          ? "bg-blue-100 text-blue-800"
                          : annonceType === "emploi"
                            ? "bg-green-100 text-green-800"
                            : "bg-pink-100 text-pink-800"
                      }
                    >
                      {annonceType === "formation" ? "Formation" : annonceType === "emploi" ? "Emploi" : "Événement"}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{titre || "Titre de l'annonce"}</h2>
                  <p className="text-muted-foreground mb-4">{description || "Description de l'annonce"}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                      {dateDebut ? format(dateDebut, "PPP", { locale: fr }) : "Date de début"}{" "}
                      {dateFin && `- ${format(dateFin, "PPP", { locale: fr })}`}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{lieu || "Lieu"}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Type d&apos;annonce</h3>
                      <p>
                        {annonceType === "formation"
                          ? "Formation"
                          : annonceType === "emploi"
                            ? "Offre d'emploi"
                            : "Événement"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Titre</h3>
                      <p>{titre || "Non renseigné"}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p>{description || "Non renseignée"}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Lieu</h3>
                      <p>{lieu || "Non renseigné"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Date</h3>
                      <p>
                        {dateDebut ? format(dateDebut, "PPP", { locale: fr }) : "Non renseignée"}{" "}
                        {dateFin && `- ${format(dateFin, "PPP", { locale: fr })}`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Date d&apos;expiration de l&apos;annonce</h3>
                    <p>{dateExpiration ? format(dateExpiration, "PPP", { locale: fr }) : "Non renseignée"}</p>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <p className="text-sm">
                      Les détails spécifiques de votre annonce ont été enregistrés et seront inclus dans la publication.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button variant="outline" onClick={() => setActiveTab("content")}>
                Retour
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={isSubmitting || !isFormValid()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer comme brouillon"
                  )}
                </Button>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  disabled={isSubmitting || !isFormValid()}
                  className="bg-modelles-600 hover:bg-modelles-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publication...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Publier l&apos;annonce
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
