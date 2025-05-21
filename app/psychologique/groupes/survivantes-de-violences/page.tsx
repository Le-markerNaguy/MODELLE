"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function GroupePage() {
  const [isRegistered, setIsRegistered] = useState(false)

  const handleRegister = () => {
    // Simuler l'inscription
    setIsRegistered(true)
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-6">
        <Link href="/psychologique" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux groupes de soutien
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Groupe de soutien : Survivantes de violences</h1>
            <div className="flex items-center space-x-2 mb-6">
              <Badge variant="outline" className="bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300">
                Groupe hebdomadaire
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                Places disponibles
              </Badge>
            </div>

            <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                fill
                alt="Groupe de soutien pour survivantes de violences"
                className="object-cover"
              />
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                <span>Mardi, 18h-20h</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                <span>Centre Mod'Elles, Libreville</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-muted-foreground mr-2" />
                <span>8 participantes maximum</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                <span>Durée : 8 semaines</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">À propos de ce groupe</h2>
            <p className="mb-4">
              Ce groupe de soutien s'adresse aux femmes qui ont vécu des situations de violence (physique,
              psychologique, sexuelle ou économique) et qui souhaitent trouver un espace sécurisant pour partager leur
              expérience, recevoir du soutien et développer des stratégies de guérison.
            </p>
            <p>
              Animé par Dr. Sylvie Obame, psychologue spécialisée dans les violences basées sur le genre, ce groupe
              offre un cadre bienveillant et confidentiel où chaque participante peut s'exprimer librement, sans
              jugement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Objectifs du groupe</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Briser l'isolement et créer des liens de solidarité entre survivantes</li>
              <li>Comprendre les mécanismes de la violence et ses impacts</li>
              <li>Développer des stratégies d'adaptation et de résilience</li>
              <li>Reconstruire l'estime de soi et la confiance en soi</li>
              <li>Apprendre à établir des limites saines dans les relations</li>
              <li>Identifier et mobiliser des ressources personnelles et communautaires</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Déroulement des séances</h2>
            <p className="mb-4">
              Chaque séance de 2 heures est structurée pour créer un espace sécurisant et favoriser les échanges
              constructifs :
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Accueil et check-in</strong> (15 min) : Moment pour partager son état émotionnel et ses
                réflexions depuis la dernière séance
              </li>
              <li>
                <strong>Thème de la séance</strong> (30 min) : Présentation d'un sujet spécifique lié au processus de
                guérison
              </li>
              <li>
                <strong>Partage d'expériences</strong> (45 min) : Temps d'échange où chacune peut s'exprimer sur le
                thème ou sur son vécu
              </li>
              <li>
                <strong>Exercice pratique</strong> (20 min) : Activité concrète pour développer des compétences ou des
                stratégies d'adaptation
              </li>
              <li>
                <strong>Conclusion et check-out</strong> (10 min) : Synthèse de la séance et partage d'un objectif
                personnel pour la semaine
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Programme des 8 semaines</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Semaine 1 : Se connaître et créer un espace sécurisant</h3>
                <p className="text-sm text-muted-foreground">
                  Présentation, établissement des règles du groupe, exercices de confiance
                </p>
              </div>
              <div>
                <h3 className="font-medium">Semaine 2 : Comprendre les mécanismes de la violence</h3>
                <p className="text-sm text-muted-foreground">
                  Types de violence, cycle de la violence, impacts psychologiques
                </p>
              </div>
              <div>
                <h3 className="font-medium">Semaine 3 : Gérer les émotions difficiles</h3>
                <p className="text-sm text-muted-foreground">
                  Identification des émotions, techniques de régulation émotionnelle
                </p>
              </div>
              <div>
                <h3 className="font-medium">Semaine 4 : Reconstruire l'estime de soi</h3>
                <p className="text-sm text-muted-foreground">
                  Exercices pour renforcer la confiance en soi, identifier ses forces
                </p>
              </div>
              <div>
                <h3 className="font-medium">Semaine 5 : Établir des limites saines</h3>
                <p className="text-sm text-muted-foreground">
                  Communication assertive, savoir dire non, reconnaître les relations toxiques
                </p>
              </div>
              <div>
                <h3 className="font-medium">Semaine 6 : Développer la résilience</h3>
                <p className="text-sm text-muted-foreground">
                  Stratégies d'adaptation positives, ressources personnelles et communautaires
                </p>
              </div>
              <div>
                <h3 className="font-medium">Semaine 7 : Se projeter dans l'avenir</h3>
                <p className="text-sm text-muted-foreground">
                  Définir ses objectifs, visualisation positive, plan d'action personnel
                </p>
              </div>
              <div>
                <h3 className="font-medium">Semaine 8 : Bilan et célébration du chemin parcouru</h3>
                <p className="text-sm text-muted-foreground">
                  Évaluation des progrès, célébration collective, ressources pour continuer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>S'inscrire au groupe</CardTitle>
                <CardDescription>Prochaine session : début le mardi 7 mai 2024</CardDescription>
              </CardHeader>
              <CardContent>
                {!isRegistered ? (
                  <div className="space-y-4">
                    <p className="text-sm">
                      L'inscription à ce groupe est gratuite mais le nombre de places est limité à 8 participantes.
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Ce groupe vous convient si :</p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Vous avez vécu une situation de violence</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Vous êtes prête à partager votre expérience</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Vous pouvez vous engager pour 8 semaines</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-2">Inscription confirmée !</h3>
                    <p className="text-sm text-muted-foreground">
                      Vous recevrez un email de confirmation avec tous les détails pratiques.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {!isRegistered ? (
                  <Button onClick={handleRegister} className="w-full bg-pink-600 hover:bg-pink-700">
                    S'inscrire
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/psychologique/groupes/confirmation">Voir les détails</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Animatrice du groupe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      fill
                      alt="Dr. Sylvie Obame"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Dr. Sylvie Obame</p>
                    <p className="text-sm text-muted-foreground">Psychologue clinicienne</p>
                  </div>
                </div>
                <p className="text-sm">
                  Spécialisée dans l'accompagnement des femmes victimes de violences depuis 14 ans, Dr. Obame a
                  développé une approche thérapeutique centrée sur la sécurité, l'empowerment et la résilience.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/psychologique/profils/dr-sylvie-obame">Voir son profil</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Besoin d'aide immédiate ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Si vous êtes actuellement en situation de danger ou avez besoin d'un soutien immédiat, n'attendez pas
                  le début du groupe.
                </p>
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/urgence">Accéder au mode urgence</Link>
                  </Button>
                  <p className="text-center text-sm font-medium">ou appelez</p>
                  <p className="text-center text-lg font-bold">XXX-XXX-XXX</p>
                  <p className="text-center text-xs text-muted-foreground">(Ligne d'écoute 24h/24)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
