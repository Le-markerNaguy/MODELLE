import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex flex-col items-center text-center mb-10 space-y-4">
        <h1 className="text-3xl font-bold">Contactez-nous</h1>
        <p className="text-muted-foreground max-w-2xl">
          Nous sommes là pour vous écouter et vous aider. N&apos;hésitez pas à nous contacter pour toute question ou
          demande d&apos;information.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input id="prenom" placeholder="Votre prénom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" placeholder="Votre nom" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre.email@exemple.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" placeholder="+241 XX XX XX XX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sujet">Sujet</Label>
                <RadioGroup defaultValue="information" id="sujet">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="information" id="information" />
                    <Label htmlFor="information">Demande d&apos;information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partenariat" id="partenariat" />
                    <Label htmlFor="partenariat">Proposition de partenariat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="presse" id="presse" />
                    <Label htmlFor="presse">Contact presse</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="autre" id="autre" />
                    <Label htmlFor="autre">Autre</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Écrivez votre message ici..." rows={5} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-pink-600 hover:bg-pink-700">Envoyer le message</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <Image src="/contact.jpeg?height=400&width=600" fill alt="Carte du bureau" className="object-cover" />
          </div>

          <div className="grid gap-4">
            <ContactInfoCard
              icon={<MapPin className="h-5 w-5 text-pink-600" />}
              title="Adresse"
              content="123 Avenue Principale, Libreville, Gabon"
            />
            <ContactInfoCard
              icon={<Phone className="h-5 w-5 text-pink-600" />}
              title="Téléphone"
              content="+241 XX XX XX XX"
            />
            <ContactInfoCard
              icon={<Mail className="h-5 w-5 text-pink-600" />}
              title="Email"
              content="contact@modelles.ga"
            />
            <ContactInfoCard
              icon={<Clock className="h-5 w-5 text-pink-600" />}
              title="Heures d&apos;ouverture"
              content="Lundi - Vendredi: 8h00 - 17h00"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Urgence 24/7</CardTitle>
              <CardDescription>Pour les situations d&apos;urgence nécessitant une assistance immédiate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">Numéro d&apos;urgence: XXX-XXX-XXX</p>
              <p className="text-sm text-muted-foreground mt-2">
                Ce numéro est disponible 24h/24 et 7j/7 pour les situations de crise nécessitant une intervention
                immédiate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ContactInfoCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <Card>
      <CardContent className="flex items-center p-4">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      </CardContent>
    </Card>
  )
}
