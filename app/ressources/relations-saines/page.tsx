import type { Metadata } from "next"
import { useEffect, useState } from "react"
import ResourceMedia from "@/components/resource-media"

export const metadata: Metadata = {
  title: "Relations Saines | Modelles",
  description: "Ressources sur les relations saines, la communication et le respect mutuel",
}

export default function RelationsSainesPage() {
  const [resource, setResource] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch("/api/resources/relations-saines")
      .then(async (res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement de la ressource")
        return res.json()
      })
      .then((data) => {
        setResource(data)
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
        setResource(null)
      })
      .finally(() => setLoading(false))
  }, [])

  // Correction du typage pour éviter l'erreur TS
  const documents = resource && resource.documents ? resource.documents : []
  const videos = resource && resource.videos ? resource.videos : []

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
        <h1 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-2">Relations Saines</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Ressources pour développer et maintenir des relations saines, basées sur le respect mutuel et la communication.
        </p>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <h2>Qu'est-ce qu'une relation saine?</h2>
          <p>
            Une relation saine est fondée sur le respect mutuel, la confiance, l'honnêteté, le soutien et l'équité. Dans une relation saine, chaque personne se sent valorisée, écoutée et libre d'être elle-même.
          </p>
          <h2>Les piliers d'une relation saine</h2>
          <ul>
            <li><strong>Communication ouverte</strong> - Pouvoir exprimer ses pensées, sentiments et besoins sans crainte</li>
            <li><strong>Respect mutuel</strong> - Valoriser les opinions, les limites et l'autonomie de l'autre</li>
            <li><strong>Confiance</strong> - Croire en l'honnêteté et la fiabilité de l'autre</li>
            <li><strong>Soutien</strong> - S'encourager mutuellement dans ses objectifs et aspirations</li>
            <li><strong>Équilibre</strong> - Maintenir un équilibre sain entre la relation et les autres aspects de la vie</li>
          </ul>
          <h2>Signes d'une relation problématique</h2>
          <p>
            Il est important de reconnaître les signes d'une relation malsaine ou abusive. Ces signes peuvent inclure:
          </p>
          <ul>
            <li>Contrôle excessif ou jalousie</li>
            <li>Isolement de la famille et des amis</li>
            <li>Manque de respect pour les limites personnelles</li>
            <li>Communication agressive ou manipulatrice</li>
            <li>Déséquilibre de pouvoir dans la prise de décision</li>
          </ul>
          <p>
            Si vous reconnaissez ces signes dans votre relation, n'hésitez pas à chercher de l'aide auprès de nos conseillers ou des ressources disponibles ci-dessous.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Ressources médias</h2>
          {loading && <div>Chargement...</div>}
          {error && <div className="text-red-600">{error}</div>}
          <ResourceMedia documents={documents} videos={videos} />
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Besoin d'aide ou de conseils?</h2>
          <p className="mb-4">
            Nos conseillers sont disponibles pour vous aider à naviguer dans vos relations et à développer des compétences pour des relations plus saines.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/rendez-vous" className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors">Prendre rendez-vous</a>
            <a href="/contact" className="inline-flex items-center px-4 py-2 border border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400 rounded-md hover:bg-rose-600/10 transition-colors">Nous contacter</a>
          </div>
        </div>
      </div>
    </main>
  )
}
