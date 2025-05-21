import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function GroupeConfirmationPage() {
  // Dans une application réelle, vous récupéreriez les données du groupe à partir d'une API ou d'une base de données
  // Ici, nous utilisons des données statiques pour la démonstration
  const group = {
    title: "Survivantes de violences",
    schedule: "Mardi, 18h-20h",
    location: "Centre Mod'Elles, Libreville",
    facilitator: "Dr. Sylvie Obame",
    startDate: "15 avril 2024",
  }

  return (
    <div className="container py-10 max-w-3xl">
      <Card className="border-2 border-green-100 dark:border-green-900/30">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Inscription confirmée !</CardTitle>
          <CardDescription>Votre inscription au groupe de soutien a été enregistrée avec succès</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Détails du groupe</h3>
            <div className="space-y-2">
              <p className="text-sm font-medium">{group.title}</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                <p className="text-sm text-muted-foreground">
                  {group.schedule} | Début le {group.startDate}
                </p>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                <p className="text-sm text-muted-foreground">{group.location}</p>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-2" />
                <p className="text-sm text-muted-foreground">Animé par {group.facilitator}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Prochaines étapes</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">
                  1
                </div>
                <p className="text-sm">Vous recevrez un email de confirmation avec tous les détails du groupe</p>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">
                  2
                </div>
                <p className="text-sm">Un rappel vous sera envoyé 24h avant la première séance</p>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">
                  3
                </div>
                <p className="text-sm">Présentez-vous 15 minutes avant le début de la première séance</p>
              </li>
            </ul>
          </div>

          <div className="bg-pink-50 dark:bg-pink-900/10 p-4 rounded-lg">
            <p className="text-sm text-center">
              Si vous avez des questions ou si vous ne pouvez pas assister à une séance, veuillez nous contacter au{" "}
              <span className="font-medium">XXX-XXX-XXX</span> ou par email à{" "}
              <span className="font-medium">groupes@modelles.ga</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
            <Link href="/psychologique/mes-groupes">Voir mes groupes</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/psychologique">Retour à l'accueil</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
