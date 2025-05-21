"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export default function BenevolatPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "Gabon",
    domain: "",
    availability: {
      days: [] as string[],
      frequency: "",
      period: ""
    },
    motivation: "",
    skills: "",
    experience: "",
    cv: null as File | null,
    acceptTerms: false,
  })

  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvailabilityChange = (type: keyof typeof formData.availability, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: value
      }
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.acceptTerms) {
      toast({
        title: "Attention",
        description: "Veuillez accepter les termes et conditions",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Envoi réel vers l'API
      const res = await fetch("/api/benevoles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          country: formData.country,
          domain: formData.domain,
          skills: formData.skills,
          experience: formData.experience,
          motivation: formData.motivation,
          availability: formData.availability,
          cvUrl: null // à gérer si upload de fichier
        })
      })
      if (!res.ok) throw new Error("Erreur API")
      
      toast({
        title: "Succès !",
        description: "Votre candidature a bien été envoyée.",
        action: <CheckCircle className="h-4 w-4 text-green-500" />,
      })
      
      setSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        country: "Gabon",
        domain: "",
        availability: {
          days: [],
          frequency: "",
          period: ""
        },
        motivation: "",
        skills: "",
        experience: "",
        cv: null,
        acceptTerms: false,
      })
      setTimeout(() => {
        router.push("/a-propos")
      }, 1200)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Devenez Bénévole
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Contribuez à notre mission en partageant votre temps et vos compétences.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/faq">Questions fréquentes</Link>
          </Button>
          <Button asChild>
            <Link href="/benevolat/temoignages">Voir les témoignages</Link>
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Formulaire d'engagement bénévole</CardTitle>
          <CardDescription>
            Merci de remplir ce formulaire avec soin. Nous vous contacterons dans les 5 jours ouvrés.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section Informations personnelles */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Informations personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom de famille"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@exemple.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+241 XX XX XX XX"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section Adresse */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Adresse</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Ville *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Libreville"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>
            </section>

            {/* Section Compétences */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Compétences et disponibilités</h2>
              
              <div className="mb-4">
                <Label>Domaine d'intervention *</Label>
                <Select 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, domain: value }))}
                  value={formData.domain}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Éducation et formation</SelectItem>
                    <SelectItem value="health">Santé et bien-être</SelectItem>
                    <SelectItem value="environment">Environnement</SelectItem>
                    <SelectItem value="social">Action sociale</SelectItem>
                    <SelectItem value="event">Organisation d'événements</SelectItem>
                    <SelectItem value="tech">Technologie et numérique</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <Label>Disponibilités *</Label>
                <div className="space-y-4">
                  <div>
                    <Label className="block mb-2">Jours disponibles</Label>
                    <div className="flex flex-wrap gap-2">
                      {daysOfWeek.map(day => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day}`}
                            checked={formData.availability.days.includes(day)}
                            onCheckedChange={(checked) => {
                              const newDays = checked
                                ? [...formData.availability.days, day]
                                : formData.availability.days.filter(d => d !== day)
                              handleAvailabilityChange("days", newDays)
                            }}
                          />
                          <Label htmlFor={`day-${day}`}>{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="frequency">Fréquence *</Label>
                      <RadioGroup 
                        value={formData.availability.frequency}
                        onValueChange={(value) => handleAvailabilityChange("frequency", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly">Hebdomadaire</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Mensuelle</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="occasional" id="occasional" />
                          <Label htmlFor="occasional">Ponctuelle</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="period">Période *</Label>
                      <RadioGroup
                        value={formData.availability.period}
                        onValueChange={(value) => handleAvailabilityChange("period", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="morning" id="morning" />
                          <Label htmlFor="morning">Matin</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="afternoon" id="afternoon" />
                          <Label htmlFor="afternoon">Après-midi</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="evening" id="evening" />
                          <Label htmlFor="evening">Soir</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="skills">Compétences spécifiques *</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Décrivez vos compétences et qualifications..."
                  rows={3}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="experience">Expérience bénévole</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Avez-vous déjà été bénévole ? Où et quand ?"
                  rows={3}
                />
              </div>
            </section>

            {/* Section Motivation */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Votre motivation</h2>
              <div className="mb-4">
                <Label htmlFor="motivation">Lettre de motivation *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Pourquoi souhaitez-vous nous rejoindre ? (200-300 mots)"
                  rows={5}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="cv">CV (optionnel)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-auto"
                  />
                  {formData.cv && (
                    <span className="text-sm text-gray-600">{formData.cv.name}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Formats acceptés : PDF, DOC, DOCX (max 5MB)
                </p>
              </div>
            </section>

            {/* Validation */}
            <section>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: !!checked }))}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms">
                    J'accepte les <Link href="/conditions" className="underline">conditions générales</Link> *
                  </Label>
                  <p className="text-sm text-gray-500">
                    Vos données seront traitées conformément à notre politique de confidentialité.
                  </p>
                </div>
              </div>
            </section>

            {/* Bouton de soumission */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting || submitted}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : submitted ? (
                  "Merci !"
                ) : (
                  "Soumettre ma candidature"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}