"use client"

import ResourceMedia from "@/components/resource-media"
import { useEffect, useState } from "react"

export default function SanteDigniteePage() {
  const [resource, setResource] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch("/api/resources/sante-dignite")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger la ressource")
        return res.json()
      })
      .then((data) => {
        setResource(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

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
          {loading && <div>Chargement...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {resource && (
            <ResourceMedia documents={resource.documents} videos={resource.videos} />
          )}
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
