import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Calendar, Info, ShoppingBag, Users, HeartHandshake } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Précarité Menstruelle | Modelles",
  description: "Informations et ressources sur la précarité menstruelle",
}

export default function PrecariteMenstruellePage() {
  return (
    <main className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Précarité Menstruelle</h1>

      <div className="max-w-3xl mx-auto mb-10">
        <p className="text-lg mb-4">
          La précarité menstruelle touche de nombreuses personnes qui n'ont pas accès aux produits d'hygiène menstruelle
          en raison de contraintes financières ou sociales. Chez Modelles, nous nous engageons à lutter contre cette
          forme de précarité et à offrir des solutions concrètes.
        </p>
      </div>

      <Tabs defaultValue="information" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="ressources">Ressources</TabsTrigger>
          <TabsTrigger value="aide">Obtenir de l'aide</TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Comprendre la précarité menstruelle
              </CardTitle>
              <CardDescription>Informations essentielles sur cette problématique sociale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Qu'est-ce que la précarité menstruelle ?</h3>
                <p>
                  La précarité menstruelle désigne la difficulté d'accès aux protections hygiéniques, aux installations
                  sanitaires, à l'éducation menstruelle et aux soins médicaux nécessaires pendant les menstruations,
                  principalement pour des raisons financières.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Les chiffres au Gabon</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Plus de 30% des femmes et filles en situation de précarité n'ont pas accès régulièrement à des
                    protections hygiéniques
                  </li>
                  <li>17% des adolescentes manquent l'école pendant leurs règles</li>
                  <li>
                    Le coût moyen des protections menstruelles représente environ 5% du budget mensuel des ménages à
                    faible revenu
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Conséquences</h3>
                <p>
                  La précarité menstruelle a des impacts significatifs sur la santé, l'éducation, le bien-être
                  psychologique et la participation sociale des personnes concernées. Elle renforce les inégalités de
                  genre et constitue un frein à l'émancipation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ressources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Ressources disponibles
              </CardTitle>
              <CardDescription>Solutions et alternatives pour lutter contre la précarité menstruelle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Alternatives économiques et écologiques</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Coupe menstruelle</h4>
                    <p className="text-sm">
                      Réutilisable pendant plusieurs années, économique sur le long terme et écologique.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Culottes menstruelles</h4>
                    <p className="text-sm">
                      Lavables et réutilisables, elles offrent confort et protection pendant plusieurs années.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Serviettes lavables</h4>
                    <p className="text-sm">Alternative écologique et économique aux serviettes jetables.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Éponges menstruelles</h4>
                    <p className="text-sm">Solution naturelle et biodégradable.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Guides et documentation</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Guide de suivi du cycle menstruel
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      <Info className="h-4 w-4" />
                      Brochure d'information sur les différentes protections hygiéniques
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Témoignages et partages d'expériences
                    </Link>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aide" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5" />
                Obtenir de l'aide
              </CardTitle>
              <CardDescription>Services et programmes d'assistance disponibles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Nos services</h3>
                <div className="grid gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Distribution gratuite de protections</h4>
                    <p className="text-sm mb-2">
                      Nous distribuons gratuitement des protections hygiéniques aux personnes en situation de précarité.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>Centre Modelles, Libreville</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>Lundi au vendredi, 9h-17h</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Ateliers d'information</h4>
                    <p className="text-sm mb-2">
                      Participez à nos ateliers pour en apprendre davantage sur la santé menstruelle et les alternatives
                      économiques.
                    </p>
                    <Button asChild size="sm" className="mt-2">
                      <Link href="/psychologique/ateliers/inscription">S'inscrire à un atelier</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Partenaires et autres ressources</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Association Dignité Féminine</h4>
                      <p className="text-sm">
                        Distribution de kits d'hygiène menstruelle dans les quartiers défavorisés
                      </p>
                      <p className="text-sm text-muted-foreground">Quartier Nzeng-Ayong, Libreville</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Centre de Santé Communautaire</h4>
                      <p className="text-sm">Consultations gratuites et distribution de protections hygiéniques</p>
                      <p className="text-sm text-muted-foreground">Quartier Akébé, Libreville</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Ligne d'assistance</h4>
                      <p className="text-sm">
                        Pour toute question sur la santé menstruelle ou pour signaler un besoin urgent
                      </p>
                      <p className="text-sm font-medium">+241 77 12 34 56</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full">
                  <Link href="/contact">Nous contacter pour une aide personnalisée</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="max-w-3xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Vous souhaitez nous aider ?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/don">Faire un don</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/benevolat">Devenir bénévole</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
