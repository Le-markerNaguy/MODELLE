'use client'
import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Calendar, Briefcase, MessageSquare, AlertTriangle } from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { useState } from "react"

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-2xl xl:text-4xl/none text-pink-700">
                Mod&apos;Elles : Votre santé, votre bien-être, votre avenir.
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Bienvenue sur Mod&apos;Elles, la plateforme gratuite et sécurisée dédiée à la santé reproductive et au
                soutien psychologique des femmes gabonaises. Découvrez également nos annonces d&apos;emploi et de
                formations pour construire votre avenir.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
                  <Link href="/inscription">Rejoins notre communauté</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-red-600 text-white hover:bg-red-700 border-red-600 hover:border-red-700"
                >
                  <Link href="/urgence">URGENCE</Link>
                </Button>
              </div>

              {/* Emergency Button Warning - Subtle version */}
              <div className="mt-4 text-xs text-gray-500 italic flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 text-gray-400" />
                <span>
                  Le bouton d&apos;urgence est réservé aux situations de danger réel. Usage abusif passible d&apos;une
                  amende.
                </span>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <Image
                src="/acceuil.jpeg?height=400&width=600"
                width={600}
                height={400}
                alt="Femmes autonomes"
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission et Objectifs */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-700">Notre Mission</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Mod&apos;Elles : Santé et bien-être au féminin
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
              Une plateforme innovante dédiée à la santé reproductive, au soutien psychologique et aux formations
              professionnelles pour les femmes au Gabon
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mt-8">
            <ObjectiveCard
              title="Santé Reproductive"
              description="T'offrir des ressources et outils pour prendre soin de ta santé reproductive et sexuelle."
              icon={<Calendar className="h-10 w-10 text-pink-600" />}
            />
            <ObjectiveCard
              title="Soutien Psychologique"
              description="Te soutenir avec un accompagnement psychologique adapté à tes besoins spécifiques."
              icon={<Heart className="h-10 w-10 text-pink-600" />}
            />
            <ObjectiveCard
              title="Formations Professionnelles"
              description="Te connecter à des offres d'emploi et des formations pour développer ton avenir professionnel."
              icon={<Briefcase className="h-10 w-10 text-pink-600" />}
            />
          </div>
        </div>
      </section>

      {/* Chatbot Alert */}
      <section className="w-full py-8 bg-pink-100">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center gap-3 text-pink-800">
            <MessageSquare className="h-6 w-6" />
            <p className="text-base font-medium">
              Un chatbot est disponible pour répondre à vos questions. Il est présent dans nos différent services.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-12 bg-pink-600">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">Statistiques alarmantes au Gabon</h2>
            <p className="text-white/80 mt-2">Des chiffres qui nous rappellent l&apos;urgence d&apos;agir</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              number="13.5%"
              title="Femmes vivant avec le VIH"
              description="Le taux de prévalence du VIH chez les femmes au Gabon est parmi les plus élevés d'Afrique centrale"
            />
            <StatCard
              number="41%"
              title="Abandon scolaire suite à une grossesse"
              description="Taux d'abandon scolaire chez les jeunes filles après une grossesse précoce"
            />
            <StatCard
              number="68%"
              title="Détresse psychologique"
              description="Pourcentage de femmes ayant signalé des symptômes de détresse psychologique au cours de l'année"
            />
          </div>

          {/* Source des statistiques */}
          <div className="mt-8 text-center">
            <p className="text-white/70 text-xs italic">
              Sources : Ministère de la Santé du Gabon (2023), Organisation Mondiale de la Santé - Rapport sur la santé
              en Afrique Centrale (2022), Institut National de la Statistique du Gabon (2023)
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-700">Nos services</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Des solutions complètes pour ta santé et ton avenir
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Notre plateforme t&apos;offre des services essentiels pour répondre à tes besoins
              </p>
            </div>
          </div>

          {/* Santé Service */}
          <div className="mt-16 grid gap-10">
            <ServiceSection
              title="Santé Reproductive"
              description="Prenez le contrôle de votre santé reproductive avec notre outil de suivi de cycle menstruel et accédez à
                des ressources éducatives complètes sur la santé féminine, adaptées au contexte gabonais."
              icon={<Calendar className="h-10 w-10 text-green-600" />}
              iconBgColor="bg-green-100"
              linkHref="/sante"
              reversed={false}
              imageUrl="/plus-de-temps-34.jpg?height=300&width=400"
              gradientColors="from-green-500/40 to-lime-500/40"
              howItWorks={[
                "Utilise notre calculateur de cycle menstruel",
                "Reçois des rappels personnalisés",
                "Accède à des informations fiables sur la santé reproductive",
                "Localise les centres de santé partenaires près de chez toi",
              ]}
            />

            {/* Psychologique Service */}
            <ServiceSection
              title="Soutien Psychologique"
              description="Consulte des psychologues et accède à des ressources pour ton bien-être émotionnel.En collaboration avec le sire nous t'apportons un accompagnement psychologique"
              icon={<Heart className="h-10 w-10 text-purple-600" />}
              iconBgColor="bg-purple-100"
              linkHref="/psychologique"
              reversed={true}
              imageUrl="/psyco.jpg?height=300&width=400"
              gradientColors="from-purple-500/40 to-pink-500/40"
              howItWorks={[
                "Échange avec un psychologue via notre chat confidentiel",
                "Prends rendez-vous pour des consultations individuelles",
                "Rejoins des groupes de soutien thématiques",
                "Accède à des ressources d'auto-assistance",
              ]}
            />

            {/* Annonces Service */}
            <ServiceSection
              title="précarité menstruelle"
              description="Découvre des offres d'emploi et des formations adaptées à ton profil pour développer ton avenir professionnel."
              icon={<Briefcase className="h-10 w-10 text-blue-600" />}
              iconBgColor="bg-blue-100"
              linkHref="/annonces"
              reversed={false}
              imageUrl="/menstruelle.jpg?height=300&width=400"
              gradientColors="from-blue-500/40 to-sky-500/40"
              howItWorks={[
                "Consulte les offres d'emploi mises à jour régulièrement",
                "Découvre des formations professionnelles adaptées",
                "Postule directement via la plateforme",
                "Reçois des alertes personnalisées selon ton profil",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-700">Témoignages</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Elles ont trouvé du soutien</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvre comment notre plateforme a aidé des femmes à améliorer leur santé et leur vie
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {/* Testimonials would go here - using placeholders for privacy */}
            <TestimonialCard
              quote="Grâce au suivi de mon cycle menstruel, j'ai pu mieux comprendre mon corps et prendre des décisions éclairées concernant ma santé."
              author="Marie K., 22 ans"
              imageUrl="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="Le soutien psychologique m'a permis de surmonter une période difficile et de retrouver confiance en moi."
              author="Sophie T., 35 ans"
              imageUrl="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="J'ai trouvé une formation professionnelle qui a changé ma vie grâce aux annonces sur Mod'Elles."
              author="Jeanne M., 19 ans"
              imageUrl="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-600">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
              Rejoins notre communauté aujourd&apos;hui
            </h2>
            <p className="text-white/80 md:text-xl/relaxed">
              Ensemble, nous pouvons créer un environnement plus sain et plus épanouissant pour toutes les femmes au
              Gabon.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4">
              <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                <Link href="/inscription">S&apos;inscrire maintenant</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-pink-700">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Chatbot */}
      <Chatbot />

      {/* Retirer le bouton d'initialisation de la base de données (seed) */}
    </div>
  )
}

function StatCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
      <p className="text-4xl font-bold text-white mb-2">{number}</p>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  )
}

function ServiceSection({
  title,
  description,
  icon,
  iconBgColor,
  linkHref,
  reversed,
  imageUrl,
  gradientColors,
  howItWorks,
}: {
  title: string
  description: string
  icon: React.ReactNode
  iconBgColor: string
  linkHref: string
  reversed: boolean
  imageUrl: string
  gradientColors: string
  howItWorks: string[]
}) {
  return (
    <div className={`grid md:grid-cols-2 gap-10 items-center ${reversed ? "md:flex-row-reverse" : ""}`}>
      <div className={`space-y-4 ${reversed ? "md:order-2" : ""}`}>
        <div className={`p-2 w-fit rounded-full ${iconBgColor}`}>{icon}</div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>

        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Comment ça marche :</h4>
          <ul className="space-y-2">
            {howItWorks.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-2 text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-600">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button asChild className="bg-pink-600 hover:bg-pink-700 mt-2">
          <Link href={linkHref}>En savoir plus</Link>
        </Button>
      </div>
      <div className={`${reversed ? "md:order-1" : ""}`}>
        <div className="relative h-[300px] w-full rounded-lg overflow-hidden group">
          <Image
            src={imageUrl || "/placeholder.svg?height=300&width=400"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-60 mix-blend-overlay`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="font-bold text-lg drop-shadow-md">{title}</p>
            <p className="text-sm drop-shadow-md">Clique pour découvrir</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ quote, author, imageUrl }: { quote: string; author: string; imageUrl: string }) {
  return (
    <Card className="flex flex-col p-6 space-y-4 hover:shadow-md transition-shadow">
      <CardContent className="space-y-4 p-0">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-pink-200">
            <Image
              src={imageUrl || "/placeholder.svg?height=100&width=100"}
              alt={author}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{author}</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 fill-current text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <p className="italic text-gray-600">&quot;{quote}&quot;</p>
      </CardContent>
    </Card>
  )
}

function ObjectiveCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center space-y-3 p-6 border rounded-lg hover:bg-accent/50 transition-colors hover:shadow-md">
      <div className="p-2 rounded-full bg-pink-100">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
