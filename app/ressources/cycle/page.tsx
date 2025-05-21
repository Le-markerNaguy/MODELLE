import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CyclePage() {
  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-6">
        <Link href="/sante" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux ressources
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Comprendre votre cycle</h1>
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span className="mr-4">Publié le 5 janvier 2024</span>
          <span className="mr-4">|</span>
          <span>Catégorie : Guide</span>
        </div>
        <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=600&width=1200" fill alt="Cycle menstruel" className="object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Les phases du cycle menstruel</h2>
            <p className="mb-4">
              Le cycle menstruel est un processus naturel qui se produit chez les femmes en âge de procréer. Il dure en
              moyenne 28 jours, mais peut varier de 21 à 35 jours selon les femmes. Ce guide complet vous aide à
              comprendre les différentes phases de votre cycle et leur impact sur votre corps et votre bien-être.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Phase folliculaire (Jours 1-14)</h3>
            <p className="mb-4">
              Cette phase commence le premier jour des règles et se termine avec l'ovulation. Pendant cette période :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Jours 1-5 :</strong> Les règles se produisent, l'endomètre se détache et est évacué.
              </li>
              <li>
                <strong>Jours 6-14 :</strong> Un follicule ovarien se développe et l'endomètre s'épaissit pour se
                préparer à une éventuelle grossesse.
              </li>
            </ul>
            <p>
              <strong>Comment vous pourriez vous sentir :</strong> Après les règles, votre énergie augmente
              généralement, votre humeur s'améliore et vous pouvez vous sentir plus sociable et créative.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Ovulation (Jour 14 environ)</h3>
            <p className="mb-4">
              L'ovulation se produit lorsque l'ovaire libère un ovule mature. Ce moment est crucial pour la conception.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>L'ovule est libéré et peut être fécondé pendant environ 24 heures.</li>
              <li>
                Les niveaux d'œstrogènes atteignent leur pic, puis commencent à diminuer tandis que la progestérone
                augmente.
              </li>
            </ul>
            <p>
              <strong>Comment vous pourriez vous sentir :</strong> Vous pourriez ressentir une légère douleur d'un côté
              de l'abdomen (douleur mittelschmerz), avoir une libido accrue et vous sentir plus confiante.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Phase lutéale (Jours 15-28)</h3>
            <p className="mb-4">
              Cette phase commence après l'ovulation et se termine avec le début des règles suivantes.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Jours 15-22 :</strong> Le corps se prépare à une éventuelle grossesse. Si l'ovule n'est pas
                fécondé, le corps commence à se préparer pour les prochaines règles.
              </li>
              <li>
                <strong>Jours 23-28 :</strong> Si aucune grossesse ne se produit, les niveaux d'hormones chutent,
                provoquant la desquamation de l'endomètre et le début des règles.
              </li>
            </ul>
            <p>
              <strong>Comment vous pourriez vous sentir :</strong> Vous pourriez ressentir des symptômes prémenstruels
              comme des ballonnements, de la fatigue, des sautes d'humeur ou des douleurs mammaires.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Suivre votre cycle</h2>
            <p className="mb-4">
              Suivre votre cycle peut vous aider à mieux comprendre votre corps et à anticiper les changements physiques
              et émotionnels. Voici quelques éléments à noter :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Premier jour des règles (début d'un nouveau cycle)</li>
              <li>Durée et intensité des règles</li>
              <li>Symptômes physiques (douleurs, sensibilité des seins, acné, etc.)</li>
              <li>Changements d'humeur et d'énergie</li>
              <li>Qualité du sommeil</li>
              <li>Changements dans la glaire cervicale (pour identifier la période fertile)</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Télécharger le guide complet
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
              <h3 className="font-bold mb-4">Outils de suivi</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Utilisez notre outil de suivi de cycle pour mieux comprendre votre corps et anticiper les changements.
              </p>
              <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
                <Link href="/sante">Accéder à l'outil</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Ressources complémentaires</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/ressources/sante-dignite" className="text-pink-600 hover:underline">
                    Santé et Dignité - En vidéo
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
              <h3 className="font-bold mb-4">Consultations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Vous avez des questions sur votre cycle ? Consultez un professionnel de santé partenaire.
              </p>
              <Button asChild className="w-full">
                <Link href="/rendez-vous">Prendre rendez-vous</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
