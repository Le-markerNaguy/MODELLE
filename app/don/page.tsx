"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Heart, CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DonPage() {
  const { toast } = useToast()
  const [donationType, setDonationType] = useState("ponctuel")
  const [amount, setAmount] = useState("5000") // Montant par défaut plus accessible
  const [customAmount, setCustomAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "", // Plus utile que l'email au Gabon
    ville: "Libreville", // Ville par défaut
    moyenPaiement: "mobile", // Mobile money très populaire
    message: "",
    receiptNeeded: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: finalAmount,
        }),
      })
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du don")
      }
      toast({
        title: "Don effectué avec succès !",
        description: "Merci pour votre générosité. Un SMS de confirmation vous sera envoyé.",
      })
      setStep(3)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step === 1 && (!amount && !customAmount)) {
      toast({
        title: "Montant requis",
        description: "Veuillez sélectionner un montant pour votre don",
        variant: "destructive",
      })
      return
    }
    setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  const finalAmount = amount === "custom" ? customAmount : amount

  // Montants adaptés au contexte local
  const amounts = ["2000", "5000", "10000"]

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-8 space-y-3">
        <div className="p-3 rounded-full bg-pink-100">
          <Heart className="h-8 w-8 text-pink-600" />
        </div>
        <h1 className="text-2xl font-bold">Soutenez notre action</h1>
        <p className="text-muted-foreground">
          Votre don aide directement les femmes gabonaises à devenir autonomes. Chaque contribution compte.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Montant du don</CardTitle>
                <CardDescription>Choisissez un montant qui vous convient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {amounts.map(value => (
                    <Button
                      key={value}
                      type="button"
                      variant={amount === value ? "default" : "outline"}
                      className={amount === value ? "bg-pink-600 hover:bg-pink-700" : ""}
                      onClick={() => {
                        setAmount(value)
                        setCustomAmount("")
                      }}
                    >
                      {value} FCFA
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customAmount">Autre montant</Label>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Entrez le montant en FCFA"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      if (e.target.value) setAmount("custom")
                    }}
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={nextStep} className="w-full bg-pink-600 hover:bg-pink-700">
                    Continuer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Vos coordonnées</CardTitle>
                <CardDescription>Remplissez ces informations pour finaliser votre don</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ville">Ville</Label>
                    <Input
                      id="ville"
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label>Moyen de paiement</Label>
                    <RadioGroup 
                      value={formData.moyenPaiement} 
                      onValueChange={(value) => setFormData({...formData, moyenPaiement: value})}
                      className="grid gap-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mobile" id="mobile" />
                        <Label htmlFor="mobile" className="font-normal">
                          Mobile Money (Airtel Money, Moov Money)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="carte" id="carte" />
                        <Label htmlFor="carte" className="font-normal">
                          Carte bancaire
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="receiptNeeded"
                      checked={formData.receiptNeeded}
                      onChange={(e) => setFormData({...formData, receiptNeeded: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="receiptNeeded" className="font-normal">
                      Je souhaite un reçu fiscal
                    </Label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Retour
                    </Button>
                    <Button type="submit" className="bg-pink-600 hover:bg-pink-700" disabled={isSubmitting}>
                      {isSubmitting ? "En cours..." : `Donner ${finalAmount} FCFA`}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Merci pour votre soutien !</CardTitle>
                <CardDescription>
                  Votre don de {finalAmount} FCFA va directement aider nos bénéficiaires.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-md text-sm">
                  <p className="font-medium mb-2">Récapitulatif :</p>
                  <p>Montant : {finalAmount} FCFA</p>
                  <p>Moyen : {formData.moyenPaiement === "mobile" ? "Mobile Money" : "Carte bancaire"}</p>
                  <p className="mt-2">Un SMS de confirmation sera envoyé au {formData.phone}</p>
                </div>

                <div className="flex flex-col space-y-3 pt-4">
                  <Button asChild variant="outline">
                    <Link href="/">Retour à l'accueil</Link>
                  </Button>
                  <Button asChild className="bg-pink-600 hover:bg-pink-700">
                    <Link href="/notre-impact">Voir l'impact de nos actions</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-pink-50 border-pink-100">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">À quoi sert votre don ?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-pink-600 mt-0.5 flex-shrink-0" />
                  <span>5 000 FCFA = 1 kit scolaire pour une jeune fille</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-pink-600 mt-0.5 flex-shrink-0" />
                  <span>10 000 FCFA = 1 session de formation professionnelle</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-pink-600 mt-0.5 flex-shrink-0" />
                  <span>20 000 FCFA = 1 micro-crédit pour une entrepreneuse</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="relative h-40 w-full rounded-md overflow-hidden mb-3">
                <Image
                  src="/femmes-entrepreneuses.jpg"
                  fill
                  alt="Femmes entrepreneuses au Gabon"
                  className="object-cover"
                />
              </div>
              <p className="text-sm italic">
                "Grâce aux dons, j'ai pu suivre une formation en couture et ouvrir mon atelier. Aujourd'hui, je gagne ma vie dignement."
              </p>
              <p className="text-sm font-medium mt-2">- Angèle, Port-Gentil</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}