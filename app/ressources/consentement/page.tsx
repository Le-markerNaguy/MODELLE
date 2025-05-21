import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Consentement | Modelles",
  description: "Ressources sur le consentement, la communication et le respect des limites",
}

export default function ConsentementPage() {
  const documents = [
    {
      title: "Guide du consentement",
      description: "Comprendre les principes fondamentaux du consentement dans toutes les relations",
      filename: "guide-consentement.pdf",
      path: "/documents/guide-consentement.pdf",
    },
    {
      title: "Communication et consentement",
      description: "Techniques pour communiquer clairement ses limites et respecter celles des autres",
      filename: "communication-consentement.pdf",
      path: "/documents/communication-consentement.pdf",
    },
  ];

  const videos = [
    {
      title: "Les bases du consentement",
      description: "Une introduction au concept de consentement et son importance",
      thumbnail: "/images/consentement-thumbnail.jpg",
      path: "/videos/consentement.mp4",
    },
    {
      title: "Consentement dans les relations",
      description: "Comment pratiquer le consentement dans différents types de relations",
      thumbnail: "/images/consentement-thumbnail.jpg",
      path: "/videos/consentement.mp4",
    },
    {
      title: "Enseigner le consentement",
      description: "Comment parler du consentement aux enfants et aux adolescents",
      thumbnail: "/images/consentement-thumbnail.jpg",
      path: "/videos/consentement.mp4",
    },
  ];

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

        <h1 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-2">Consentement</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Ressources pour comprendre et pratiquer le consentement dans toutes les relations.
        </p>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <h2>Qu'est-ce que le consentement?</h2>
          <p>
            Le consentement est un accord volontaire, clair et enthousiaste à participer à une activité avec quelqu'un. Il doit être donné librement, sans pression ni manipulation, et peut être retiré à tout moment. Le consentement est essentiel dans toutes les relations, qu'elles soient amicales, familiales, amoureuses ou professionnelles.
          </p>
          <ul>
            <li>Le consentement doit être explicite, jamais supposé.</li>
            <li>Il peut être retiré à tout moment, même si une activité a déjà commencé.</li>
            <li>Le silence ou l'absence de résistance ne signifient pas consentement.</li>
            <li>Le consentement doit être donné par toutes les personnes impliquées.</li>
          </ul>
          <h3>Pourquoi est-ce important&nbsp;?</h3>
          <p>
            Respecter le consentement, c'est respecter l'autre et soi-même. Cela permet d'établir des relations saines, basées sur la confiance et la communication. Le consentement protège contre les abus et favorise l'autonomie de chacun.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Guides et documents à télécharger</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <a
                key={doc.filename}
                href={doc.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block border rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg text-rose-700 mb-1">{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                <span className="text-xs text-rose-500">Télécharger le PDF</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Vidéos pédagogiques</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
                <video
                  controls
                  poster={video.thumbnail}
                  className="w-full h-48 object-cover bg-black"
                  src={video.path}
                >
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                <div className="p-4">
                  <h3 className="font-bold text-base mb-1 text-rose-700">{video.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
