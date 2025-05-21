import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  Building,
  Users,
  GraduationCap,
  Share2,
  ArrowLeft,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AnnoncePage({ params }: { params: { slug: string } }) {
  // Dans une application réelle, vous récupéreriez les données de l'annonce à partir d'une API ou d'une base de données
  // Ici, nous utilisons des données statiques pour la démonstration
  const annonce = {
    id: "1",
    titre: "Formation en Entrepreneuriat Féminin",
    type: "formation",
    description:
      "Une formation complète pour développer vos compétences entrepreneuriales et lancer votre entreprise avec succès. Cette formation intensive de 6 jours vous permettra d'acquérir les connaissances et compétences essentielles pour créer et gérer votre entreprise.",
    contenu: `
      <h3>Objectifs de la formation</h3>
      <ul>
        <li>Comprendre les fondamentaux de l'entrepreneuriat</li>
        <li>Développer un business plan solide</li>
        <li>Maîtriser les bases de la gestion financière</li>
        <li>Élaborer une stratégie marketing efficace</li>
        <li>Développer son réseau professionnel</li>
      </ul>
      
      <h3>Programme</h3>
      <p><strong>Jour 1:</strong> Introduction à l'entrepreneuriat et identification des opportunités</p>
      <p><strong>Jour 2:</strong> Élaboration du business plan et étude de marché</p>
      <p><strong>Jour 3:</strong> Gestion financière et recherche de financement</p>
      <p><strong>Jour 4:</strong> Marketing et stratégie commerciale</p>
      <p><strong>Jour 5:</strong> Aspects juridiques et administratifs</p>
      <p><strong>Jour 6:</strong> Networking et présentation des projets</p>
      
      <h3>Public cible</h3>
      <p>Cette formation s'adresse aux femmes souhaitant créer leur entreprise ou ayant récemment lancé leur activité.</p>
      
      <h3>Prérequis</h3>
      <p>Aucun prérequis spécifique n'est nécessaire. La formation est ouverte à toutes les femmes motivées par l'entrepreneuriat.</p>
    `,
    organisation: "Mod'Elles",
    lieu: "Centre Mod'Elles, Libreville",
    date: "15-20 mai 2024",
    horaires: "9h00 - 17h00",
    deadline: "30 avril 2024",
    places: "15 places disponibles",
    prix: "Formation gratuite (financée par nos partenaires)",
    contact: "formations@modelles.ga | +241 XX XX XX XX",
    image: "/placeholder.svg?height=400&width=800",
    categories: ["entrepreneuriat", "business", "finance"],
    formateurs: [
      {
        nom: "Marie Ndong",
        titre: "Entrepreneure et Consultante",
        bio: "15 ans d'expérience dans l'accompagnement d'entreprises",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        nom: "Sophie Obame",
        titre: "Experte en Finance",
        bio: "Spécialiste du financement des PME",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  }

  // Obtenir l'icône en fonction du type d'annonce
  const getAnnonceIcon = (type: string) => {
    switch (type) {
      case "formation":
        return <GraduationCap className="h-6 w-6 text-blue-500" />
      case "emploi":
        return <Briefcase className="h-6 w-6 text-green-500" />
      case "evenement":
        return <Calendar className="h-6 w-6 text-pink-500" />
      default:
        return <Briefcase className="h-6 w-6" />
    }
  }

  // Obtenir la couleur du badge en fonction du type d'annonce
  const getAnnonceColor = (type: string) => {
    switch (type) {
      case "formation":
        return "bg-blue-100 text-blue-800"
      case "emploi":
        return "bg-green-100 text-green-800"
      case "evenement":
        return "bg-pink-100 text-pink-800"
      default:
        return ""
    }
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/annonces" className="text-muted-foreground hover:text-foreground flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux annonces
        </Link>
      </div>

      <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-6">
        <Image
          src={annonce.image || "/placeholder.svg?height=400&width=800"}
          alt={annonce.titre}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge variant="outline" className={`mb-2 ${getAnnonceColor(annonce.type)}`}>
            {annonce.type === "formation" ? "Formation" : annonce.type === "emploi" ? "Emploi" : "Événement"}
          </Badge>
          <h1 className="text-3xl font-bold text-white">{annonce.titre}</h1>
          <p className="text-white/90 mt-2">{annonce.organisation}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{annonce.description}</p>
              <div dangerouslySetInnerHTML={{ __html: annonce.contenu }} className="prose max-w-none" />

              {annonce.formateurs && annonce.formateurs.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Formateurs</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {annonce.formateurs.map((formateur, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                          <Image
                            src={formateur.image || "/placeholder.svg?height=100&width=100"}
                            alt={formateur.nom}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{formateur.nom}</p>
                          <p className="text-sm text-muted-foreground">{formateur.titre}</p>
                          <p className="text-xs text-muted-foreground mt-1">{formateur.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Informations</CardTitle>
              <CardDescription>Détails de l&apos;annonce</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-modelles-600 mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{annonce.date}</p>
                </div>
              </div>

              {annonce.horaires && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-modelles-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Horaires</p>
                    <p className="text-sm text-muted-foreground">{annonce.horaires}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-modelles-600 mt-0.5" />
                <div>
                  <p className="font-medium">Lieu</p>
                  <p className="text-sm text-muted-foreground">{annonce.lieu}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-modelles-600 mt-0.5" />
                <div>
                  <p className="font-medium">Organisation</p>
                  <p className="text-sm text-muted-foreground">{annonce.organisation}</p>
                </div>
              </div>

              {annonce.places && (
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-modelles-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Places</p>
                    <p className="text-sm text-muted-foreground">{annonce.places}</p>
                  </div>
                </div>
              )}

              {annonce.prix && (
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 flex items-center justify-center text-modelles-600 mt-0.5">€</div>
                  <div>
                    <p className="font-medium">Prix</p>
                    <p className="text-sm text-muted-foreground">{annonce.prix}</p>
                  </div>
                </div>
              )}

              {annonce.deadline && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Date limite d&apos;inscription</p>
                    <p className="text-sm text-red-500">{annonce.deadline}</p>
                  </div>
                </div>
              )}

              {annonce.contact && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-modelles-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">{annonce.contact}</p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button className="w-full bg-modelles-600 hover:bg-modelles-700">
                  {annonce.type === "formation"
                    ? "S'inscrire à la formation"
                    : annonce.type === "emploi"
                      ? "Postuler à cette offre"
                      : "S'inscrire à l'événement"}
                </Button>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager cette annonce
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6">Autres annonces qui pourraient vous intéresser</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="h-full transition-all hover:shadow-md">
            <div className="relative h-40 w-full">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Formation en Compétences Numériques"
                fill
                className="object-cover rounded-t-lg"
              />
              <Badge variant="outline" className="absolute top-2 right-2 bg-blue-100 text-blue-800">
                Formation
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Formation en Compétences Numériques</CardTitle>
              <CardDescription>Tech4Women</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Juin - Juillet 2024</p>
              <Button variant="link" className="p-0 h-auto text-sm mt-2">
                <Link href="/annonces/formation-competences-numeriques">Voir les détails</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full transition-all hover:shadow-md">
            <div className="relative h-40 w-full">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Assistante Administrative"
                fill
                className="object-cover rounded-t-lg"
              />
              <Badge variant="outline" className="absolute top-2 right-2 bg-green-100 text-green-800">
                Emploi
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Assistante Administrative</CardTitle>
              <CardDescription>Entreprise Partenaire</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Poste à pourvoir immédiatement</p>
              <Button variant="link" className="p-0 h-auto text-sm mt-2">
                <Link href="/annonces/assistante-administrative">Voir les détails</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full transition-all hover:shadow-md">
            <div className="relative h-40 w-full">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Atelier de Leadership Féminin"
                fill
                className="object-cover rounded-t-lg"
              />
              <Badge variant="outline" className="absolute top-2 right-2 bg-pink-100 text-pink-800">
                Événement
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Atelier de Leadership Féminin</CardTitle>
              <CardDescription>Mod'Elles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">22-23 juin 2024</p>
              <Button variant="link" className="p-0 h-auto text-sm mt-2">
                <Link href="/annonces/atelier-leadership-feminin">Voir les détails</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
