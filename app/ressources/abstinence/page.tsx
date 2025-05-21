import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AbstinencePage() {
  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-6">
        <Link href="/sante" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux ressources
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">La Valeur de l'Abstinence</h1>
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span className="mr-4">Publié le 10 février 2024</span>
          <span className="mr-4">|</span>
          <span>Catégorie : Article</span>
        </div>
        <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-8">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            fill
            alt="La valeur de l'abstinence"
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Pourquoi choisir l'abstinence ?</h2>
            <p className="mb-4">
              L'abstinence est un choix personnel qui peut être fait pour diverses raisons, qu'elles soient religieuses,
              culturelles, liées à la santé ou simplement par préférence personnelle. Cet article explore les avantages
              et les bienfaits de l'abstinence pour les jeunes.
            </p>
            <p className="mb-4">
              Contrairement à certaines idées reçues, l'abstinence n'est pas simplement l'absence d'activité sexuelle,
              mais un choix positif et affirmé qui peut apporter de nombreux bénéfices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Les avantages de l'abstinence</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Protection contre les IST :</strong> L'abstinence est la seule méthode 100% efficace pour
                prévenir les infections sexuellement transmissibles.
              </li>
              <li>
                <strong>Prévention des grossesses non désirées :</strong> Elle élimine tout risque de grossesse non
                planifiée.
              </li>
              <li>
                <strong>Développement personnel :</strong> Elle permet de se concentrer sur d'autres aspects de son
                développement personnel, comme les études, les amitiés et les passions.
              </li>
              <li>
                <strong>Clarté émotionnelle :</strong> Elle peut aider à éviter les complications émotionnelles qui
                peuvent parfois accompagner les relations sexuelles.
              </li>
              <li>
                <strong>Alignement avec les valeurs personnelles :</strong> Pour certains, l'abstinence est en accord
                avec leurs croyances religieuses ou culturelles.
              </li>
              <li>
                <strong>Renforcement de l'estime de soi :</strong> Elle peut contribuer à une meilleure connaissance de
                soi et à une plus grande confiance en ses choix.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Comment vivre l'abstinence positivement</h2>
            <p className="mb-4">
              L'abstinence n'est pas toujours facile, surtout dans une société où la sexualité est omniprésente. Voici
              quelques conseils pour vivre ce choix de manière positive :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Communiquez clairement :</strong> Soyez honnête avec vos partenaires potentiels sur votre choix
                d'abstinence.
              </li>
              <li>
                <strong>Entourez-vous de soutien :</strong> Cherchez des amis ou des groupes qui respectent et
                soutiennent votre décision.
              </li>
              <li>
                <strong>Fixez des limites claires :</strong> Déterminez à l'avance quelles sont vos limites personnelles
                et tenez-vous-y.
              </li>
              <li>
                <strong>Développez d'autres aspects de vos relations :</strong> Concentrez-vous sur la communication, le
                respect mutuel et les intérêts communs.
              </li>
              <li>
                <strong>Soyez fier de votre choix :</strong> L'abstinence est une décision personnelle valide qui mérite
                d'être respectée.
              </li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Télécharger l'article complet
            </Button>
            <Button variant="outline" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Ressources complémentaires</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/ressources/consentement" className="text-pink-600 hover:underline">
                    Le Consentement : Comprendre et Respecter
                  </Link>
                </li>
                <li>
                  <Link href="/ressources/relations-saines" className="text-pink-600 hover:underline">
                    Communication et Relations Saines
                  </Link>
                </li>
                <li>
                  <Link href="/ressources/estime-soi" className="text-pink-600 hover:underline">
                    Estime de Soi
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Témoignages</h3>
              <div className="space-y-4">
                <blockquote className="italic text-sm">
                  "Choisir l'abstinence m'a permis de me concentrer sur mes études et de développer des relations plus
                  profondes basées sur la communication et le respect mutuel."
                  <footer className="text-right mt-1 not-italic">- Marie, 19 ans</footer>
                </blockquote>
                <blockquote className="italic text-sm">
                  "L'abstinence est en accord avec mes valeurs religieuses. Ce n'est pas toujours facile, mais je me
                  sens en paix avec ma décision."
                  <footer className="text-right mt-1 not-italic">- Thomas, 22 ans</footer>
                </blockquote>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Besoin de conseils ?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Si vous avez des questions ou besoin de parler à quelqu'un, nos conseillers sont disponibles pour vous
                écouter sans jugement.
              </p>
              <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
