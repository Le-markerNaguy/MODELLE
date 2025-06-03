'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Calendar, MapPin, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PsychologiquePage() {
  const [psychologists, setPsychologists] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resources, setResources] = useState<any[]>([])
  const [isLoadingResources, setIsLoadingResources] = useState(true)
  const [errorResources, setErrorResources] = useState<string | null>(null)
  const [groups, setGroups] = useState<any[]>([])
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)
  const [errorGroups, setErrorGroups] = useState<string | null>(null)
  const [workshops, setWorkshops] = useState<any[]>([])
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(true)
  const [errorWorkshops, setErrorWorkshops] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    fetch("/api/professionals?type=psychologue")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger la liste des psychologues")
        return res.json()
      })
      .then((data) => {
        setPsychologists(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    setIsLoadingResources(true)
    fetch("/api/resources")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger les ressources")
        return res.json()
      })
      .then((data) => {
        setResources(Array.isArray(data) ? data : [])
        setIsLoadingResources(false)
      })
      .catch((err) => {
        setErrorResources(err.message)
        setIsLoadingResources(false)
      })
  }, [])

  useEffect(() => {
    setIsLoadingGroups(true)
    fetch("/api/support-groups")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger les groupes de soutien")
        return res.json()
      })
      .then((data) => {
        setGroups(Array.isArray(data) ? data : [])
        setIsLoadingGroups(false)
      })
      .catch((err) => {
        setErrorGroups(err.message)
        setIsLoadingGroups(false)
      })
  }, [])

  useEffect(() => {
    setIsLoadingWorkshops(true)
    fetch("/api/workshops")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger les ateliers")
        return res.json()
      })
      .then((data) => {
        setWorkshops(Array.isArray(data) ? data : [])
        setIsLoadingWorkshops(false)
      })
      .catch((err) => {
        setErrorWorkshops(err.message)
        setIsLoadingWorkshops(false)
      })
  }, [])

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
          {isLoading ? (
            <div className="text-center text-muted-foreground py-8">Chargement des psychologues...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {psychologists.map((psy: any) => (
                <PsychologistCard
                  key={psy.id}
                  name={psy.name}
                  specialty={psy.specialty}
                  experience={psy.experience}
                  availability={psy.availability}
                  imageUrl={psy.imageUrl || "/placeholder.svg?height=200&width=200"}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="resources">
          {isLoadingResources ? (
            <div className="text-center text-muted-foreground py-8">Chargement des ressources...</div>
          ) : errorResources ? (
            <div className="text-center text-red-500 py-8">{errorResources}</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              {resources.map((res: any) => (
                <ResourceCard
                  key={res.id}
                  title={res.title}
                  type={res.type}
                  description={res.description}
                  imageUrl={res.imageUrl || "/placeholder.svg?height=200&width=300"}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="groupes">
          {isLoadingGroups ? (
            <div className="text-center text-muted-foreground py-8">Chargement des groupes de soutien...</div>
          ) : errorGroups ? (
            <div className="text-center text-red-500 py-8">{errorGroups}</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {groups.map((group: any) => (
                <GroupCard
                  key={group.id}
                  title={group.name}
                  schedule={group.schedule}
                  location={group.location}
                  facilitator={group.facilitatorName}
                />
              ))}
            </div>
          )}
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
        {isLoadingWorkshops ? (
          <div className="text-center text-muted-foreground py-8">Chargement des ateliers...</div>
        ) : errorWorkshops ? (
          <div className="text-center text-red-500 py-8">{errorWorkshops}</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {workshops.map((workshop: any) => (
              <WorkshopCard
                key={workshop.id}
                title={workshop.title}
                date={workshop.date}
                location={workshop.location}
                imageUrl={workshop.imageUrl || "/placeholder.svg?height=200&width=300"}
              />
            ))}
          </div>
        )}
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
