import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star, HeartPulse, BookOpen, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Ressources | Modelles",
  description: "Ressources éducatives sur la santé menstruelle, l'estime de soi et les relations saines",
}

export default function RessourcesPage() {
  return (
    <main className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ressources</h1>
        <p className="text-muted-foreground">
          Découvrez nos ressources éducatives pour vous accompagner dans votre parcours de bien-être.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-rose-500" />
            </div>
            <CardTitle>Relations Saines</CardTitle>
            <CardDescription>
              Ressources pour comprendre et cultiver des relations équilibrées et respectueuses.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Comprendre le consentement</li>
              <li>Communication dans les relations</li>
              <li>Reconnaître les relations toxiques</li>
              <li>Établir des limites saines</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/ressources/relations-saines">
                Explorer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-amber-500" />
            </div>
            <CardTitle>Estime de Soi</CardTitle>
            <CardDescription>
              Ressources pour développer une estime de soi positive et une image corporelle saine.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Affirmations positives</li>
              <li>Exercices de pleine conscience</li>
              <li>Image corporelle positive</li>
              <li>Résilience et confiance en soi</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/ressources/estime-soi">
                Explorer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mb-4">
              <HeartPulse className="h-6 w-6 text-emerald-500" />
            </div>
            <CardTitle>Santé et Dignité</CardTitle>
            <CardDescription>Ressources sur la santé menstruelle, reproductive et le bien-être global.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Comprendre le cycle menstruel</li>
              <li>Options de produits d'hygiène</li>
              <li>Santé reproductive</li>
              <li>Bien-être holistique</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/ressources/sante-dignite">
                Explorer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle>Consentement</CardTitle>
            <CardDescription>
              Ressources pour comprendre l'importance du consentement dans toutes les relations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Les bases du consentement</li>
              <li>Communication claire</li>
              <li>Respect des limites</li>
              <li>Consentement dans différents contextes</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/ressources/consentement">
                Explorer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-purple-500"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M12 8v4l3 3"></path>
              </svg>
            </div>
            <CardTitle>Calculateur de Cycle</CardTitle>
            <CardDescription>Outil pour suivre votre cycle menstruel et mieux comprendre votre corps.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Suivi des dates de règles</li>
              <li>Prédiction des prochains cycles</li>
              <li>Comprendre les phases du cycle</li>
              <li>Gestion des symptômes</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/ressources/cycle">
                Utiliser l'outil <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-pink-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <CardTitle>Abstinence</CardTitle>
            <CardDescription>
              Informations sur l'abstinence comme choix personnel et méthode de contraception.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Comprendre l'abstinence</li>
              <li>Avantages et considérations</li>
              <li>Communication avec les partenaires</li>
              <li>Prise de décision éclairée</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/ressources/abstinence">
                Explorer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
