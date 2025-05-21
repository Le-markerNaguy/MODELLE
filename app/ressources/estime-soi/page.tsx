import type { Metadata } from "next"
import ResourceMedia from "@/components/resource-media"

export const metadata: Metadata = {
  title: "Estime de Soi | Modelles",
  description: "Ressources pour développer une image positive de soi et renforcer sa confiance",
}

export default function EstimeDeSoiPage() {
  const documents = [
    {
      title: "Journal d'affirmations positives",
      description: "Un guide pour créer et maintenir un journal d'affirmations quotidiennes",
      filename: "journal-affirmations.pdf",
      path: "/documents/journal-affirmations.pdf",
    },
    {
      title: "Exercices de pleine conscience pour l'estime de soi",
      description: "Techniques de méditation et de pleine conscience pour améliorer l'estime de soi",
      filename: "pleine-conscience-estime-soi.pdf",
      path: "/documents/pleine-conscience-estime-soi.pdf",
    },
    {
      title: "Développer une image corporelle positive",
      description: "Guide pour cultiver une relation saine avec son corps et son apparence",
      filename: "image-corporelle-positive.pdf",
      path: "/documents/image-corporelle-positive.pdf",
    },
  ]

  const videos = [
    {
      title: "Les fondements de l'estime de soi",
      description: "Comprendre ce qu'est l'estime de soi et son importance",
      thumbnail: "/images/estime-de-soi-thumbnail.jpg",
      path: "/videos/estime-de-soi.mp4",
    },
    {
      title: "Surmonter l'autocritique",
      description: "Techniques pour transformer le dialogue intérieur négatif",
      thumbnail: "/images/estime-de-soi-thumbnail.jpg",
      path: "/videos/estime-de-soi.mp4",
    },
    {
      title: "Affirmer ses limites",
      description: "Comment établir des limites saines pour renforcer l'estime de soi",
      thumbnail: "/images/estime-de-soi-thumbnail.jpg",
      path: "/videos/estime-de-soi.mp4",
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
        <h1 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-2">Estime de Soi</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Ressources pour développer une image positive de soi et renforcer sa confiance personnelle.
        </p>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <h2>Qu'est-ce que l'estime de soi?</h2>
          <p>
            L'estime de soi est la valeur que nous nous accordons en tant qu'individu. C'est notre perception de notre
            propre valeur, de nos capacités et de notre place dans le monde. Une bonne estime de soi est essentielle
            pour notre bien-être mental et émotionnel.
          </p>

          <h2>Pourquoi l'estime de soi est-elle importante?</h2>
          <p>Une estime de soi saine nous permet de:</p>
          <ul>
            <li>Faire face aux défis de la vie avec confiance</li>
            <li>Établir des relations saines et équilibrées</li>
            <li>Affirmer nos besoins et nos limites</li>
            <li>Poursuivre nos objectifs malgré les obstacles</li>
            <li>Nous remettre plus facilement des échecs et des déceptions</li>
          </ul>

          <h2>Comment développer une meilleure estime de soi</h2>
          <p>Développer une estime de soi saine est un processus continu qui implique:</p>
          <ul>
            <li>Pratiquer l'auto-compassion et la bienveillance envers soi-même</li>
            <li>Reconnaître et célébrer ses forces et ses réussites</li>
            <li>Accepter ses imperfections comme faisant partie de l'expérience humaine</li>
            <li>Établir des limites saines dans ses relations</li>
            <li>Prendre soin de sa santé physique et mentale</li>
            <li>S'entourer de personnes positives et soutenantes</li>
          </ul>

          <p>
            Les ressources ci-dessous vous aideront à entamer ou à poursuivre votre parcours vers une meilleure estime
            de soi.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Ressources médias</h2>
          <ResourceMedia documents={documents} videos={videos} />
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Ateliers sur l'estime de soi</h2>
          <p className="mb-4">
            Modelles propose régulièrement des ateliers et des groupes de soutien axés sur le développement de l'estime
            de soi.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/psychologique/ateliers/inscription"
              className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
            >
              S'inscrire à un atelier
            </a>
            <a
              href="/psychologique/groupes/inscription"
              className="inline-flex items-center px-4 py-2 border border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400 rounded-md hover:bg-rose-600/10 transition-colors"
            >
              Rejoindre un groupe de soutien
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
