import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Calendar, MapPin, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function PsychologiquePage() {
  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex flex-col items-center text-center mb-10 space-y-4">
        <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
          <Heart className="h-10 w-10 text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold">Soutien psychologique</h1>
        <p className="text-muted-foreground max-w-2xl">
          Consultez des psychologues et accédez à des ressources pour votre bien-être émotionnel et mental.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Votre bien-être mental est essentiel</h2>
          <p className="text-muted-foreground mb-4">
            Notre équipe de psychologues et de conseillers est là pour vous offrir un soutien professionnel dans un
            environnement sûr et confidentiel. Que vous traversiez une période difficile, que vous ayez subi un
            traumatisme ou que vous cherchiez simplement à améliorer votre bien-être mental, nous sommes là pour vous.
          </p>
          <p className="text-muted-foreground mb-6">
            Nous proposons des consultations individuelles, des groupes de soutien et des ressources éducatives pour
            vous aider à développer des stratégies d'adaptation saines et à retrouver votre équilibre émotionnel.
          </p>
          <div className="bg-pink-50 dark:bg-pink-900/10 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Services psychologiques disponibles :</h3>
            <ul className="space-y-1 list-disc pl-5 text-sm">
              <li>Chat anonyme avec des psychologues spécialisés</li>
              <li>Consultations individuelles confidentielles</li>
              <li>Groupes de soutien thématiques</li>
              <li>Ressources d'auto-assistance</li>
              <li>Ligne d'écoute 24h/24 et 7j/7</li>
            </ul>
          </div>
          <Link href="/psychologique/rendez-vous">
            <Button className="mt-6 bg-pink-600 hover:bg-pink-700">Prendre rendez-vous</Button>
          </Link>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image
            src="/soutienSp.jpeg?height=400&width=600"
            fill
            alt="Soutien psychologique"
            className="object-cover"
          />
        </div>
      </div>

      <Tabs defaultValue="psychologues" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="psychologues">Psychologues Partenaires</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
          <TabsTrigger value="groupes">Groupes de Soutien</TabsTrigger>
        </TabsList>

        <TabsContent value="psychologues">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <PsychologistCard
              name="Dr. Émilie Ntoutoume"
              specialty="Traumatismes et SSPT"
              experience="12 ans d'expérience"
              availability="Lun, Mer, Ven: 9h-17h"
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <PsychologistCard
              name="Dr. Marc Ondo"
              specialty="Thérapie familiale"
              experience="15 ans d'expérience"
              availability="Mar, Jeu: 8h-16h"
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <PsychologistCard
              name="Dr. Claire Mba"
              specialty="Anxiété et dépression"
              experience="10 ans d'expérience"
              availability="Lun, Mar, Jeu: 10h-18h"
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <PsychologistCard
              name="Dr. Thomas Ndong"
              specialty="Thérapie cognitivo-comportementale"
              experience="8 ans d'expérience"
              availability="Mer, Ven: 9h-15h"
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <PsychologistCard
              name="Dr. Sylvie Obame"
              specialty="Violences basées sur le genre"
              experience="14 ans d'expérience"
              availability="Lun, Mar, Mer: 8h-16h"
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <PsychologistCard
              name="Dr. Jean Moussavou"
              specialty="Addictions et dépendances"
              experience="11 ans d'expérience"
              availability="Jeu, Ven: 10h-18h"
              imageUrl="/placeholder.svg?height=200&width=200"
            />
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <ResourceCard
              title="Guide de gestion du stress"
              type="Guide"
              description="Techniques et exercices pratiques pour gérer le stress quotidien et réduire l'anxiété."
              imageUrl="/placeholder.svg?height=200&width=300"
            />
            <ResourceCard
              title="Comprendre et surmonter un traumatisme"
              type="E-book"
              description="Ressources pour comprendre les effets du traumatisme et les étapes vers la guérison."
              imageUrl="/placeholder.svg?height=200&width=300"
            />
            <ResourceCard
              title="Méditation guidée pour l'anxiété"
              type="Audio"
              description="Séances de méditation guidée pour aider à calmer l'anxiété et retrouver la sérénité."
              imageUrl="/placeholder.svg?height=200&width=300"
            />
            <ResourceCard
              title="Journal de gratitude et d'affirmations"
              type="Outil pratique"
              description="Un journal à imprimer pour cultiver la gratitude et renforcer l'estime de soi au quotidien."
              imageUrl="/placeholder.svg?height=200&width=300"
            />
            <ResourceCard
              title="Reconnaître les signes de dépression"
              type="Guide"
              description="Comment identifier les symptômes de la dépression et quand chercher de l'aide professionnelle."
              imageUrl="/placeholder.svg?height=200&width=300"
            />
            <ResourceCard
              title="Techniques d'auto-apaisement"
              type="Vidéo"
              description="Exercices pratiques pour s'apaiser lors de moments de détresse émotionnelle intense."
              imageUrl="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>

        <TabsContent value="groupes">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <GroupCard
              title="Survivantes de violences"
              schedule="Mardi, 18h-20h"
              location="Centre Mod'Elles, Libreville"
              facilitator="Dr. Sylvie Obame"
            />
            <GroupCard
              title="Gestion de l'anxiété"
              schedule="Jeudi, 17h-19h"
              location="En ligne (Zoom)"
              facilitator="Dr. Claire Mba"
            />
            <GroupCard
              title="Deuil et perte"
              schedule="Samedi, 10h-12h"
              location="Centre Mod'Elles, Libreville"
              facilitator="Dr. Marc Ondo"
            />
            <GroupCard
              title="Parentalité positive"
              schedule="Mercredi, 18h-20h"
              location="Centre Mod'Elles, Libreville"
              facilitator="Dr. Thomas Ndong"
            />
            <GroupCard
              title="Estime de soi et confiance"
              schedule="Lundi, 17h-19h"
              location="Centre Mod'Elles, Libreville"
              facilitator="Dr. Émilie Ntoutoume"
            />
            <GroupCard
              title="Jeunes femmes (18-25 ans)"
              schedule="Vendredi, 16h-18h"
              location="En ligne (Zoom)"
              facilitator="Dr. Jean Moussavou"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-pink-50 dark:bg-pink-900/10 rounded-lg p-8 mb-12">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Consultations Psychologiques</h2>
            <p className="text-muted-foreground mb-6">
              Nos psychologues partenaires offrent des consultations confidentielles pour vous aider à surmonter vos
              difficultés émotionnelles et psychologiques. Prenez rendez-vous dès aujourd'hui pour un entretien
              personnalisé.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-3">
                  <span className="font-bold text-pink-600">1</span>
                </div>
                <p>Choisissez un psychologue spécialisé dans votre domaine de préoccupation</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-3">
                  <span className="font-bold text-pink-600">2</span>
                </div>
                <p>Sélectionnez une date et une heure qui vous conviennent</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-3">
                  <span className="font-bold text-pink-600">3</span>
                </div>
                <p>Consultez en personne, par téléphone ou par vidéoconférence</p>
              </div>
            </div>
            <Link href="/psychologique/rendez-vous">
              <Button className="mt-6 bg-pink-600 hover:bg-pink-700">Prendre rendez-vous</Button>
            </Link>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              fill
              alt="Consultation psychologique"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Ateliers de Bien-être</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Participez à nos ateliers pour développer des compétences d'adaptation et améliorer votre bien-être
          émotionnel.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <WorkshopCard
            title="Gestion du stress et relaxation"
            date="18 avril 2024"
            location="Centre Mod'Elles, Libreville"
            imageUrl="/placeholder.svg?height=200&width=300"
          />
          <WorkshopCard
            title="Communication assertive"
            date="25 avril 2024"
            location="En ligne (Zoom)"
            imageUrl="/placeholder.svg?height=200&width=300"
          />
          <WorkshopCard
            title="Pleine conscience et méditation"
            date="2 mai 2024"
            location="Centre Mod'Elles, Libreville"
            imageUrl="/placeholder.svg?height=200&width=300"
          />
        </div>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Besoin d'un soutien psychologique immédiat ?</CardTitle>
          <CardDescription>
            Notre ligne d'écoute est disponible 24h/24 et 7j/7 pour vous offrir un soutien en cas de crise.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-pink-600">XXX-XXX-XXX</p>
          <p className="text-muted-foreground mt-2">
            Nos conseillers formés sont là pour vous écouter et vous orienter vers les ressources appropriées.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function PsychologistCard({
  name,
  specialty,
  experience,
  availability,
  imageUrl,
}: {
  name: string
  specialty: string
  experience: string
  availability: string
  imageUrl: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={imageUrl || "/placeholder.svg"} fill alt={name} className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-muted-foreground">{specialty}</p>
        <p className="text-sm text-muted-foreground">{experience}</p>
        <div className="flex justify-between items-center mt-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
            {availability}
          </Badge>
          <Link href={`/psychologique/profils/${name.toLowerCase().replace(/\s+/g, "-")}`}>
            <Button size="sm">Voir profil</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function ResourceCard({
  title,
  type,
  description,
  imageUrl,
}: {
  title: string
  type: string
  description: string
  imageUrl: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <Image src={imageUrl || "/placeholder.svg"} fill alt={title} className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold">{title}</h3>
          <Badge variant="outline">{type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" size="sm" className="w-full">
          Accéder
        </Button>
      </CardContent>
    </Card>
  )
}

function GroupCard({
  title,
  schedule,
  location,
  facilitator,
}: {
  title: string
  schedule: string
  location: string
  facilitator: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Groupe de soutien</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{schedule}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-sm">
          <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Animé par {facilitator}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/psychologique/groupes/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <Button className="w-full">S'inscrire</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function WorkshopCard({
  title,
  date,
  location,
  imageUrl,
}: {
  title: string
  date: string
  location: string
  imageUrl: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <Image src={imageUrl || "/placeholder.svg"} fill alt={title} className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">{title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Calendar className="h-4 w-4 mr-2" />
          {date}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          {location}
        </div>
        <Link href={`/psychologique/ateliers/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <Button size="sm" className="w-full">
            S'inscrire
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
