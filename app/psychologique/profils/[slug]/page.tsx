import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, Clock, Star, Mail, Phone, FileText, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PsychologueProfilePage({ params }: { params: { slug: string } }) {
  // Dans une application réelle, vous récupéreriez les données du psychologue à partir d'une API ou d'une base de données
  // Ici, nous utilisons des données statiques pour la démonstration
  const psychologist = {
    name: "Dr. Émilie Ntoutoume",
    specialty: "Traumatismes et SSPT",
    experience: "12 ans d'expérience",
    availability: "Lun, Mer, Ven: 9h-17h",
    bio: "Dr. Émilie Ntoutoume est spécialisée dans le traitement des traumatismes et du syndrome de stress post-traumatique (SSPT). Avec 12 ans d'expérience, elle a aidé de nombreuses personnes à surmonter des expériences traumatiques et à retrouver un équilibre émotionnel. Elle utilise une approche intégrative combinant thérapie cognitivo-comportementale, EMDR et techniques de pleine conscience.",
    education: [
      "Doctorat en Psychologie Clinique, Université de Libreville, 2011",
      "Master en Psychologie, Université Paris-Descartes, 2008",
      "Formation en EMDR, Institut Français d'EMDR, 2013",
    ],
    expertise: [
      "Syndrome de stress post-traumatique (SSPT)",
      "Traumatismes liés aux violences",
      "Anxiété et troubles paniques",
      "Dépression post-traumatique",
      "Thérapie EMDR",
    ],
    approaches: [
      "Thérapie cognitivo-comportementale (TCC)",
      "EMDR (Eye Movement Desensitization and Reprocessing)",
      "Pleine conscience et techniques de relaxation",
      "Thérapie narrative",
    ],
    languages: ["Français", "Anglais", "Fang"],
    contact: {
      email: "emilie.ntoutoume@modelles.ga",
      phone: "+241 XX XX XX XX",
      address: "Centre Mod'Elles, 123 Rue Principale, Libreville",
    },
    ratings: 4.9,
    reviewCount: 38,
    imageUrl: "/placeholder.svg?height=400&width=400",
  }

  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground mr-2">
          Soutien Psychologique
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground mr-2">
          Psychologues Partenaires
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <span>{psychologist.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-10">
        <div className="md:col-span-1">
          <div className="sticky top-20">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-4">
              <Image
                src={psychologist.imageUrl || "/placeholder.svg"}
                fill
                alt={psychologist.name}
                className="object-cover"
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{psychologist.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">{psychologist.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">{psychologist.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Disponibilité</p>
                    <p className="text-sm text-muted-foreground">{psychologist.availability}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/psychologique/rendez-vous" className="w-full">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">Prendre rendez-vous</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{psychologist.name}</h1>
              <p className="text-xl text-muted-foreground">{psychologist.specialty}</p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{psychologist.ratings}</span>
              </div>
              <Badge variant="outline">{psychologist.reviewCount} avis</Badge>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="expertise">Approche</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>À propos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{psychologist.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Formation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {psychologist.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Langues parlées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {psychologist.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expertise">
              <Card>
                <CardHeader>
                  <CardTitle>Domaines d'expertise</CardTitle>
                  <CardDescription>Spécialités et problématiques traitées</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {psychologist.expertise.map((exp, index) => (
                      <li key={index} className="flex items-start">
                        <Heart className="h-5 w-5 mr-2 text-pink-600" />
                        <div>
                          <p className="font-medium">{exp}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Approches thérapeutiques</CardTitle>
                  <CardDescription>Méthodes et techniques utilisées</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {psychologist.approaches.map((approach, index) => (
                      <li key={index} className="flex items-start">
                        <BookOpen className="h-5 w-5 mr-2 text-pink-600" />
                        <div>
                          <p className="font-medium">{approach}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Avis clients</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-2xl font-bold">{psychologist.ratings}</span>
                      <span className="ml-2 text-muted-foreground">({psychologist.reviewCount} avis)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ReviewCard
                    name="Sophie L."
                    rating={5}
                    date="20 mars 2024"
                    comment="Dr. Ntoutoume m'a aidée à surmonter un traumatisme que je portais depuis des années. Sa méthode EMDR a été très efficace et son approche bienveillante m'a mise en confiance dès la première séance."
                  />
                  <ReviewCard
                    name="Marie-Claire D."
                    rating={5}
                    date="5 février 2024"
                    comment="Excellente psychologue qui sait mettre à l'aise et qui propose des techniques concrètes pour gérer l'anxiété. Grâce à elle, j'ai pu reprendre le contrôle de ma vie après un événement traumatisant."
                  />
                  <ReviewCard
                    name="Jeanne B."
                    rating={4}
                    date="12 janvier 2024"
                    comment="Dr. Ntoutoume est très professionnelle et à l'écoute. Les séances sont bien structurées et elle donne des exercices pratiques à faire entre les rendez-vous. Seul petit bémol, parfois les délais pour obtenir un rendez-vous sont longs."
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir tous les avis
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Prochaines disponibilités</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <AppointmentSlot date="Lundi 15 avril" slots={["9h00", "11h30", "14h00", "16h30"]} />
              <AppointmentSlot date="Mercredi 17 avril" slots={["10h00", "13h30", "15h00"]} />
              <AppointmentSlot date="Vendredi 19 avril" slots={["9h30", "12h00", "14h30", "16h00"]} />
            </div>
            <div className="mt-4 text-center">
              <Link href="/psychologique/rendez-vous">
                <Button className="bg-pink-600 hover:bg-pink-700">Voir toutes les disponibilités</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewCard({
  name,
  rating,
  date,
  comment,
}: {
  name: string
  rating: number
  date: string
  comment: string
}) {
  return (
    <div className="border-b pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{comment}</p>
    </div>
  )
}

function AppointmentSlot({ date, slots }: { date: string; slots: string[] }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-2">{date}</h3>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <Link key={slot} href={`/psychologique/rendez-vous?date=${date}&time=${slot}`}>
            <Button variant="outline" size="sm" className="w-full">
              {slot}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
