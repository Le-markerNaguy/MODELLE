import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PsychologueProfilPage() {
  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-6">
        <Link href="/psychologique" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux psychologues
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
              <Image
                src="/placeholder.svg?height=300&width=300"
                fill
                alt="Dr. Émilie Ntoutoume"
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">Dr. Émilie Ntoutoume</h1>
            <p className="text-muted-foreground mb-4">Psychologue clinicienne</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                >
                  Disponible
                </Badge>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">Centre Mod'Elles, Libreville</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">Lun, Mer, Ven: 9h-17h</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">+241 XX XX XX XX</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">e.ntoutoume@modelles.ga</span>
              </div>
            </div>

            <Button asChild className="w-full bg-pink-600 hover:bg-pink-700 mb-3">
              <Link href="/psychologique/rendez-vous">Prendre rendez-vous</Link>
            </Button>
            <Button variant="outline" className="w-full">
              Contacter
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Spécialités</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">Traumatismes</Badge>
              <Badge variant="secondary">SSPT</Badge>
              <Badge variant="secondary">Anxiété</Badge>
              <Badge variant="secondary">Dépression</Badge>
              <Badge variant="secondary">Violences basées sur le genre</Badge>
              <Badge variant="secondary">Thérapie familiale</Badge>
            </div>
            <p>
              Dr. Émilie Ntoutoume est spécialisée dans le traitement des traumatismes et du syndrome de stress
              post-traumatique (SSPT). Elle accompagne particulièrement les femmes ayant vécu des situations
              traumatiques ou des violences basées sur le genre.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Parcours professionnel</h2>
            <p className="mb-4">
              Avec 12 ans d'expérience en psychologie clinique, Dr. Ntoutoume a travaillé dans divers contextes
              thérapeutiques, notamment :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Centre hospitalier universitaire de Libreville (5 ans)</li>
              <li>ONG internationale d'aide aux victimes de violences (4 ans)</li>
              <li>Cabinet privé spécialisé en traumatologie (3 ans)</li>
            </ul>
            <p>
              Elle est titulaire d'un doctorat en psychologie clinique de l'Université Omar Bongo et a suivi des
              formations spécialisées en thérapie EMDR (Eye Movement Desensitization and Reprocessing) et en thérapie
              cognitivo-comportementale.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Approche thérapeutique</h2>
            <p className="mb-4">
              Dr. Ntoutoume adopte une approche intégrative qui combine plusieurs méthodes thérapeutiques adaptées aux
              besoins spécifiques de chaque patiente :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Thérapie EMDR :</strong> Pour le traitement des traumatismes et des souvenirs douloureux
              </li>
              <li>
                <strong>Thérapie cognitivo-comportementale :</strong> Pour modifier les schémas de pensée négatifs et
                les comportements problématiques
              </li>
              <li>
                <strong>Approche centrée sur la personne :</strong> Créant un espace d'écoute bienveillant et sans
                jugement
              </li>
              <li>
                <strong>Techniques de pleine conscience :</strong> Pour développer la conscience de soi et la gestion du
                stress
              </li>
            </ul>
            <p>
              Sa pratique est fondée sur le respect, l'empathie et la confidentialité, créant un environnement
              sécurisant où les patientes peuvent explorer leurs difficultés et trouver des voies de guérison.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Témoignages</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Il y a 3 mois</span>
                  </div>
                  <p className="italic text-sm">
                    "Dr. Ntoutoume m'a aidée à surmonter un traumatisme que je portais depuis des années. Sa patience,
                    son écoute et ses techniques thérapeutiques m'ont permis de retrouver confiance en moi et de
                    reconstruire ma vie. Je lui serai éternellement reconnaissante."
                  </p>
                  <p className="text-right text-sm font-medium mt-2">- Marie K.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Il y a 6 mois</span>
                  </div>
                  <p className="italic text-sm">
                    "Grâce à Dr. Émilie, j'ai pu comprendre et gérer mon anxiété. Elle m'a donné des outils pratiques
                    que j'utilise au quotidien. Son approche est professionnelle mais aussi très humaine."
                  </p>
                  <p className="text-right text-sm font-medium mt-2">- Sophie M.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Prendre rendez-vous</h2>
            <p className="mb-4">
              Les consultations avec Dr. Ntoutoume peuvent se dérouler en présentiel au Centre Mod'Elles de Libreville
              ou en téléconsultation selon vos préférences et votre situation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Tarifs</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Consultation initiale (1h30) : 45 000 FCFA</li>
                  <li>Consultation de suivi (1h) : 35 000 FCFA</li>
                  <li>Tarif social (sur justificatif) : 20 000 FCFA</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Prochaines disponibilités</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Lundi 22 avril : 10h, 14h</li>
                  <li>Mercredi 24 avril : 9h, 11h, 15h</li>
                  <li>Vendredi 26 avril : 13h, 16h</li>
                </ul>
              </div>
            </div>
            <Button asChild className="mt-4 bg-pink-600 hover:bg-pink-700">
              <Link href="/psychologique/rendez-vous">
                <Calendar className="mr-2 h-4 w-4" />
                Prendre rendez-vous
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}
