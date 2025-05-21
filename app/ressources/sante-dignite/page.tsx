import type { Metadata } from "next"
import ResourceMedia from "@/components/resource-media"

export const metadata: Metadata = {
  title: "Santé et Dignité | Modelles",
  description: "Ressources sur la santé menstruelle, le bien-être et la dignité personnelle",
}

export default function SanteDigniteePage() {
  const documents = [
    {
      title: "Guide complet du cycle menstruel",
      description: "Comprendre les différentes phases du cycle menstruel et leur impact",
      filename: "guide-cycle-menstruel.pdf",
      path: "/documents/guide-cycle-menstruel.pdf",
    },
    {
      title: "Comparatif des produits d'hygiène menstruelle",
      description: "Avantages et inconvénients des différentes options disponibles",
      filename: "produits-hygiene-menstruelle.pdf",
      path: "/documents/produits-hygiene-menstruelle.pdf",
    },
    {
      title: "Comprendre et combattre la précarité menstruelle",
      description: "Ressources et solutions pour lutter contre la précarité menstruelle",
      filename: "precarite-menstruelle.pdf",
      path: "/documents/precarite-menstruelle.pdf",
    },
  ]

  const videos = [
    {
      title: "Comprendre son cycle menstruel",
      description: "Les bases pour mieux comprendre et vivre avec son cycle",
      thumbnail: "/images/sante-menstruelle-thumbnail.jpg",
      path: "/videos/sante-menstruelle.mp4",
    },
    {
      title: "Options d'hygiène menstruelle durables",
      description: "Présentation des alternatives écologiques aux produits jetables",
      thumbnail: "/images/sante-menstruelle-thumbnail.jpg",
      path: "/videos/sante-menstruelle.mp4",
    },
    {
      title: "Santé menstruelle et bien-être",
      description: "Comment prendre soin de soi pendant les menstruations",
      thumbnail: "/images/sante-menstruelle-thumbnail.jpg",
      path: "/videos/sante-menstruelle.mp4",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-6">
          <a href="/sante">
            <button className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded shadow transition">
              ← Retour à la page Santé
            </button>
          </a>
        </div>

        <h1 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-2">Santé et Dignité</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Ressources sur la santé menstruelle, le bien-être et la dignité personnelle.
        </p>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <h2>Santé menstruelle et dignité</h2>
          <p>
            La santé menstruelle est un aspect fondamental de la santé globale des personnes qui ont des règles.
            Pourtant, ce sujet reste souvent tabou et entouré de désinformation. Chez Modelles, nous croyons que l'accès
            à l'information, aux produits d'hygiène menstruelle et aux soins de santé est un droit fondamental.
          </p>

          <h2>Comprendre son cycle</h2>
          <p>
            Le cycle menstruel est bien plus que les règles. C'est un processus complexe qui influence notre corps et
            notre bien-être tout au long du mois. Comprendre son cycle peut aider à:
          </p>
          <ul>
            <li>Mieux gérer les symptômes prémenstruels</li>
            <li>Identifier les anomalies qui pourraient nécessiter une attention médicale</li>
            <li>Planifier ses activités en fonction de son énergie et de son bien-être</li>
            <li>Développer une relation plus positive avec son corps</li>
          </ul>

          <h2>La précarité menstruelle</h2>
          <p>
            La précarité menstruelle désigne la difficulté d'accès aux produits d'hygiène menstruelle, aux installations
            sanitaires appropriées et à l'éducation sur la santé menstruelle. Ce problème touche des millions de
            personnes dans le monde, y compris en France.
          </p>
          <p>Modelles s'engage à lutter contre la précarité menstruelle à travers:</p>
          <ul>
            <li>La distribution gratuite de produits d'hygiène menstruelle</li>
            <li>Des ateliers d'éducation sur la santé menstruelle</li>
            <li>Le plaidoyer pour des politiques publiques plus inclusives</li>
            <li>Le soutien aux initiatives locales de lutte contre la précarité menstruelle</li>
          </ul>

          <p>
            Pour en savoir plus sur nos actions contre la précarité menstruelle, visitez notre{" "}
            <a href="/precarite-menstruelle">page dédiée</a>.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Ressources médias</h2>
          <ResourceMedia documents={documents} videos={videos} />
          <div className="flex flex-wrap gap-4 mt-6">
            {documents.map((doc, idx) => (
              <a
                key={doc.filename}
                href="/sante"
                className="inline-flex items-center px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded shadow text-sm transition"
                style={{ marginRight: 8, marginBottom: 8 }}
              >
                ← Retour à la page Santé
              </a>
            ))}
            {videos.map((video, idx) => (
              <a
                key={video.title + idx}
                href="/sante"
                className="inline-flex items-center px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded shadow text-sm transition"
                style={{ marginRight: 8, marginBottom: 8 }}
              >
                ← Retour à la page Santé
              </a>
            ))}
          </div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Besoin de produits d'hygiène menstruelle?</h2>
          <p className="mb-4">
            Modelles distribue gratuitement des produits d'hygiène menstruelle. Contactez-nous ou passez à notre centre
            pour en bénéficier.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/precarite-menstruelle"
              className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
            >
              Programme de distribution
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400 rounded-md hover:bg-rose-600/10 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
