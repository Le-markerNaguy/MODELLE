"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function InscriptionPartenairePage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    organisationName: "",
    contactName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    country: "Gabon",
    organisationType: "",
    description: "",
    website: "",
    partnershipType: [] as string[],
    acceptTerms: false
  })

  const organisationTypes = [
    "Association",
    "Entreprise",
    "Institution publique",
    "ONG",
    "Fondation",
    "Autre"
  ]

  const partnershipTypes = [
    "Financier",
    "Matériel",
    "Compétences",
    "Mécénat",
    "Événementiel",
    "Communication"
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      partnershipType: checked
        ? [...prev.partnershipType, type]
        : prev.partnershipType.filter(t => t !== type)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      })
      return
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Attention",
        description: "Veuillez accepter les conditions d'utilisation",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/partenaires/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Ne pas envoyer le champ de confirmation
          confirmPassword: undefined 
        })
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || "Erreur lors de l'inscription")
      }

      toast({
        title: "Inscription réussie !",
        description: "Votre demande de partenariat a été envoyée avec succès.",
      })

      router.push("/partenaires/confirmation")
      
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Devenir Partenaire</CardTitle>
          <CardDescription>
            Rejoignez notre réseau de partenaires engagés et collaborez avec nous
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-4">Informations de l'organisation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="organisationName">Nom de l'organisation *</Label>
                  <Input
                    id="organisationName"
                    name="organisationName"
                    value={formData.organisationName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="organisationType">Type d'organisation *</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("organisationType", value)}
                    value={formData.organisationType}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {organisationTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="contactName">Personne à contacter *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-4">Coordonnées</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
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

                <div>
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-4">Type de partenariat</h3>
              <div className="space-y-2">
                <Label>Domaines de collaboration *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {partnershipTypes.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`partnership-${type}`}
                        checked={formData.partnershipType.includes(type)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(type, !!checked)
                        }
                      />
                      <Label htmlFor={`partnership-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-4">Description</h3>
              <div>
                <Label htmlFor="description">Présentez votre organisation *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="Décrivez vos activités, valeurs et motivations pour ce partenariat..."
                />
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-4">Sécurité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmez le mot de passe *</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, acceptTerms: !!checked }))
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms">
                  J'accepte les <Link href="/conditions" className="underline">conditions générales</Link> *
                </Label>
                <p className="text-sm text-muted-foreground">
                  En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Soumettre la demande de partenariat"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}