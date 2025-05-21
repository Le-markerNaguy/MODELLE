import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Heart, BookOpen, Briefcase, Users, Globe, HandHeart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-10 max-w-6xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold">À propos de Mod'Elles</h1>
        <p className="text-muted-foreground max-w-3xl text-lg">
          Une initiative dédiée à la protection, l'accompagnement et l'autonomisation des femmes au Gabon
        </p>
      </div>

      {/* Introduction */}
      <div className="grid gap-10 md:grid-cols-2 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Qui sommes-nous ?</h2>
          <p className="text-muted-foreground mb-4">
            Mod'Elles est une organisation à but non lucratif fondée en 2020 par un groupe de femmes gabonaises
            déterminées à créer un environnement plus sûr et plus équitable pour toutes les femmes du pays.
          </p>
          <p className="text-muted-foreground mb-4">
            Face aux défis persistants de violence basée sur le genre, d'inégalités économiques et de manque d'accès aux
            ressources essentielles, nous avons développé une plateforme numérique innovante qui offre un ensemble
            complet de services pour répondre aux besoins des femmes gabonaises.
          </p>
          <p className="text-muted-foreground">
            Notre équipe est composée de professionnels dévoués dans les domaines juridique, psychologique, médical et
            économique, tous unis par la conviction que chaque femme mérite de vivre en sécurité, avec dignité et
            indépendance.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/made.jpeg?height=400&width=600" fill alt="L'équipe Mod'Elles" className="object-cover" />
        </div>
      </div>

      {/* Mission et Vision */}
      <div className="bg-pink-50 dark:bg-pink-900/10 rounded-lg p-10 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Notre Mission et Vision</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Nous œuvrons pour un Gabon où chaque femme peut s'épanouir sans crainte, avec un accès égal aux opportunités
            et aux ressources.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <MissionCard
            icon={<Shield className="h-10 w-10 text-pink-600" />}
            title="Protéger"
            description="Offrir aux femmes des outils de sécurité et d'alerte pour prévenir les dangers et préserver les preuves en cas de violence."
          />
          <MissionCard
            icon={<Heart className="h-10 w-10 text-pink-600" />}
            title="Accompagner"
            description="Soutenir les victimes de violences avec un accompagnement juridique, psychologique et social adapté à leurs besoins."
          />
          <MissionCard
            icon={<BookOpen className="h-10 w-10 text-pink-600" />}
            title="Informer & Éduquer"
            description="Fournir des ressources fiables sur la santé reproductive, les droits des femmes et la gestion des risques."
          />
          <MissionCard
            icon={<Briefcase className="h-10 w-10 text-pink-600" />}
            title="Autonomiser"
            description="Encourager l'indépendance financière des femmes à travers le mentorat et l'accès aux opportunités économiques."
          />
        </div>
      </div>
      {/* Nos Valeurs */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Les principes qui guident nos actions et notre engagement
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ValueCard
            title="Respect et Dignité"
            description="Nous traitons chaque femme avec respect et dignité, reconnaissant sa valeur intrinsèque et son droit à l'autodétermination."
            isPink
          />
          <ValueCard
            title="Confidentialité"
            description="Nous garantissons la confidentialité absolue des informations partagées, créant un espace sûr où les femmes peuvent s'exprimer sans crainte."
            isPink={false}
          />
          <ValueCard
            title="Inclusion"
            description="Nous nous engageons à servir toutes les femmes, quels que soient leur origine, leur statut social, leur religion ou leur orientation sexuelle."
            isPink
          />
          <ValueCard
            title="Excellence"
            description="Nous visons l'excellence dans tous nos services, en nous appuyant sur des pratiques fondées sur des preuves et en améliorant continuellement notre offre."
            isPink={false}
          />
          <ValueCard
            title="Collaboration"
            description="Nous croyons en la force de la collaboration et travaillons en partenariat avec diverses organisations pour maximiser notre impact."
            isPink
          />
          <ValueCard
            title="Innovation"
            description="Nous adoptons l'innovation technologique et sociale pour trouver des solutions créatives aux défis complexes auxquels sont confrontées les femmes."
            isPink={false}
          />
        </div>
      </div>
      {/* Notre Équipe */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Des professionnels dévoués qui travaillent chaque jour pour faire avancer notre mission
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TeamMemberCard
            name="Marie Ndong"
            role="Fondatrice et Directrice"
            bio="Avocate de formation avec 15 ans d'expérience dans la défense des droits des femmes."
            imageUrl="/placeholder.svg?height=300&width=300"
          />
          <TeamMemberCard
            name="Sophie Obame"
            role="Responsable Juridique"
            bio="Spécialiste du droit de la famille et des questions de violence basée sur le genre."
            imageUrl="/placeholder.svg?height=300&width=300"
          />
          <TeamMemberCard
            name="Jean Moussavou"
            role="Responsable Psychologique"
            bio="Psychologue clinicien spécialisé dans le traitement des traumatismes et le soutien aux victimes."
            imageUrl="/placeholder.svg?height=300&width=300"
          />
          <TeamMemberCard
            name="Claire Mba"
            role="Responsable Santé"
            bio="Médecin avec une expertise en santé reproductive et droits des femmes."
            imageUrl="/placeholder.svg?height=300&width=300"
          />
          <TeamMemberCard
            name="Thomas Ndong"
            role="Responsable Technologie"
            bio="Ingénieur en informatique passionné par l'utilisation de la technologie pour le changement social."
            imageUrl="/placeholder.svg?height=300&width=300"
          />
          <TeamMemberCard
            name="Jeanne Kouassi"
            role="Responsable Autonomisation"
            bio="Entrepreneure et mentor avec une vaste expérience dans le développement économique des femmes."
            imageUrl="/placeholder.svg?height=300&width=300"
          />
        </div>
      </div>

      {/* Nos Partenaires */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Nos Partenaires</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Des organisations qui partagent notre vision et soutiennent notre mission
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PartnerCard
            name="Ministère de la Famille et de la Promotion de la Femme"
            type="Gouvernemental"
            imageUrl="/placeholder.svg?height=100&width=200"
          />
          <PartnerCard name="ONU Femmes Gabon" type="International" imageUrl="/placeholder.svg?height=100&width=200" />
          <PartnerCard
            name="Association des Juristes Gabonaises"
            type="ONG Locale"
            imageUrl="/placeholder.svg?height=100&width=200"
          />
          <PartnerCard
            name="Fondation pour la Santé des Femmes"
            type="Fondation"
            imageUrl="/placeholder.svg?height=100&width=200"
          />
          <PartnerCard
            name="Tech for Good Gabon"
            type="Entreprise Sociale"
            imageUrl="/placeholder.svg?height=100&width=200"
          />
          <PartnerCard
            name="Réseau des Femmes Entrepreneures"
            type="Association Professionnelle"
            imageUrl="/placeholder.svg?height=100&width=200"
          />
        </div>
      </div>

      {/* Nos Réalisations */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Nos Réalisations</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            L'impact de notre travail sur la vie des femmes gabonaises
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AchievementCard
            icon={<Users className="h-10 w-10 text-pink-600" />}
            number="5,000+"
            description="Femmes soutenues à travers nos différents services"
          />
          <AchievementCard
            icon={<Shield className="h-10 w-10 text-pink-600" />}
            number="3"
            description="Cas de violence signalés et traités via notre plateforme"
          />
          <AchievementCard
            icon={<Globe className="h-10 w-10 text-pink-600" />}
            number="1"
            description="Provinces du Gabon où nos services sont disponibles"
          />

          <AchievementCard
            icon={<Briefcase className="h-10 w-10 text-pink-600" />}
            number="500+"
            description="Femmes ayant lancé leur entreprise grâce à notre programme d'autonomisation"
          />
          <AchievementCard
            icon={<Heart className="h-10 w-10 text-pink-600" />}
            number="2,000+"
            description="Consultations psychologiques fournies"
          />
          <AchievementCard
            icon={<BookOpen className="h-10 w-10 text-pink-600" />}
            number="50+"
            description="Ateliers de sensibilisation organisés à travers le pays"
          />
          <AchievementCard
            icon={<HandHeart className="h-10 w-10 text-pink-600" />}
            number="100+"
            description="Professionnels bénévoles engagés dans notre réseau"
          />
        </div>
      </div>

      {/* Comment nous soutenir */}
      <div className="bg-pink-50 dark:bg-pink-900/10 rounded-lg p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Comment nous soutenir</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Rejoignez-nous dans notre mission pour créer un avenir meilleur pour les femmes gabonaises
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <SupportCard
            title="Faire un don"
            description="Votre contribution financière nous aide à maintenir et à étendre nos services pour atteindre plus de femmes dans le besoin."
            buttonText="Faire un don"
            buttonLink="/don"
          />
          <SupportCard
            title="Devenir bénévole"
            description="Mettez vos compétences et votre temps au service de notre cause. Nous avons besoin de professionnels dans divers domaines."
            buttonText="Rejoindre l'équipe"
            buttonLink="/benevolat"
          />
          <SupportCard
            title="Devenir partenaire"
            description="Si vous représentez une organisation qui partage nos valeurs, explorons comment nous pouvons collaborer pour maximiser notre impact."
            buttonText="Proposer un partenariat"
            buttonLink="/partenaires/inscription"
          />
        </div>
      </div>
    </div>
  )
}

function MissionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function ValueCard({
  title,
  description,
  isPink,
}: {
  title: string
  description: string
  isPink: boolean
}) {
  return (
    <Card className={`${isPink ? "bg-pink-500 text-white" : "bg-white text-black border border-gray-200"}`}>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className={`${isPink ? "text-white/90" : "text-black/80"}`}>{description}</p>
      </CardContent>
    </Card>
  )
}

function TeamMemberCard({
  name,
  role,
  bio,
  imageUrl,
}: {
  name: string
  role: string
  bio: string
  imageUrl: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 w-full">
        <Image src={imageUrl || "/placeholder.svg"} fill alt={name} className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-pink-600 font-medium mb-2">{role}</p>
        <p className="text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  )
}

function PartnerCard({ name, type, imageUrl }: { name: string; type: string; imageUrl: string }) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="relative h-16 w-full mb-4">
          <Image src={imageUrl || "/placeholder.svg"} fill alt={name} className="object-contain" />
        </div>
        <h3 className="font-bold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{type}</p>
      </CardContent>
    </Card>
  )
}

function AchievementCard({
  icon,
  number,
  description,
}: {
  icon: React.ReactNode
  number: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30 mb-4">{icon}</div>
        <p className="text-3xl font-bold text-pink-600 mb-2">{number}</p>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function SupportCard({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
        <Button asChild className="bg-pink-600 hover:bg-pink-700 w-full">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
