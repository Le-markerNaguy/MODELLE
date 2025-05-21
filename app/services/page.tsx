import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Calendar, Users, BookOpen, HeartHandshake, Stethoscope, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Nos Services | Modelles",
  description: "Découvrez les services offerts par Modelles pour soutenir les femmes et les filles",
}

export default function ServicesPage() {
  return (
    <main className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Nos Services</h1>

      <div className="max-w-3xl mx-auto mb-10">
        <p className="text-lg text-center mb-4">
          Modelles offre une gamme complète de services pour soutenir les femmes et les filles dans leur développement
          personnel, leur santé et leur bien-être.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Santé */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Santé</CardTitle>
            <CardDescription>Services de santé reproductive et générale</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Stethoscope className="h-5 w-5 mt-0.5 text-primary" />
                <span>Consultations médicales</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="h-5 w-5 mt-0.5 text-primary" />
                <span>Suivi gynécologique</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 mt-0.5 text-primary" />
                <span>Éducation à la santé</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/sante">En savoir plus</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Soutien psychologique */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Soutien psychologique</CardTitle>
            <CardDescription>Accompagnement pour votre bien-être mental</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MessageCircle className="h-5 w-5 mt-0.5 text-primary" />
                <span>Consultations individuelles</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-5 w-5 mt-0.5 text-primary" />
                <span>Groupes de soutien</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="h-5 w-5 mt-0.5 text-primary" />
                <span>Ateliers thématiques</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/psychologique">En savoir plus</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Précarité menstruelle */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <HeartHandshake className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Précarité menstruelle</CardTitle>
            <CardDescription>Solutions et soutien pour la dignité menstruelle</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Heart className="h-5 w-5 mt-0.5 text-primary" />
                <span>Distribution de protections hygiéniques</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 mt-0.5 text-primary" />
                <span>Éducation menstruelle</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-5 w-5 mt-0.5 text-primary" />
                <span>Ateliers pratiques</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/precarite-menstruelle">En savoir plus</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Ressources éducatives */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Ressources éducatives</CardTitle>
            <CardDescription>Informations et outils pour s'autonomiser</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 mt-0.5 text-primary" />
                <span>Guides et brochures</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="h-5 w-5 mt-0.5 text-primary" />
                <span>Calculateur de cycle menstruel</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-5 w-5 mt-0.5 text-primary" />
                <span>Conseils sur les relations saines</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/ressources">En savoir plus</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Urgence */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <CardTitle>Services d'urgence</CardTitle>
            <CardDescription>Assistance immédiate en cas de besoin</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MessageCircle className="h-5 w-5 mt-0.5 text-red-500" />
                <span>Chat d'urgence 24/7</span>
              </li>
              <li className="flex items-start gap-2">
                <HeartHandshake className="h-5 w-5 mt-0.5 text-red-500" />
                <span>Orientation vers les services appropriés</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-5 w-5 mt-0.5 text-red-500" />
                <span>Soutien immédiat</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="destructive" className="w-full">
              <Link href="/urgence">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Opportunités professionnelles */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Opportunités professionnelles</CardTitle>
            <CardDescription>Annonces d'emploi et formations</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Calendar className="h-5 w-5 mt-0.5 text-primary" />
                <span>Offres d'emploi</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 mt-0.5 text-primary" />
                <span>Formations professionnelles</span>
              </li>
              <li className="flex items-start gap-2">
                <HeartHandshake className="h-5 w-5 mt-0.5 text-primary" />
                <span>Mentorat et accompagnement</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/annonces">En savoir plus</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Besoin d'aide personnalisée ?</h2>
        <Button asChild size="lg">
          <Link href="/contact">Contactez-nous</Link>
        </Button>
      </div>
    </main>
  )
}
