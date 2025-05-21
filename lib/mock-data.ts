"use client"

// lib/mock-data.ts
// Données statiques pour remplacer les appels API

/**
 * Ce fichier contient des données statiques pour simuler les réponses de l'API
 * Il remplace les appels API qui ont été supprimés
 */

export interface User {
  id: string
  nom: string
  prenom: string
  email: string
  telephone?: string
  role: "utilisateur" | "admin" | "partenaire"
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  titre: string
  message: string
  lue: boolean
  type: "info" | "alerte" | "succès"
  createdAt: string
  lien?: string
}

export interface RendezVous {
  id: string
  userId: string
  serviceName: string
  date: string
  statut: "confirmé" | "en attente" | "annulé"
}

export interface CentreService {
  id: string
  nom: string
  description: string
  adresse: string
  telephone: string
  email: string
  horaires: string
  image?: string
}

export interface Psychologue {
  id: string
  nom: string
  prenom: string
  titre: string
  specialites: string[]
  description: string
  photo?: string
  disponibilites?: {
    jour: string
    heures: string
  }[]
}

export interface Groupe {
  id: string
  nom: string
  description: string
  dateDebut: string
  dateFin?: string
  horaire: string
  lieu: string
  animateur: string
  places: number
  placesRestantes: number
  image?: string
}

export interface Atelier {
  id: string
  nom: string
  description: string
  date: string
  horaire: string
  lieu: string
  animateur: string
  places: number
  placesRestantes: number
  image?: string
}

export interface Annonce {
  id: string
  titre: string
  entreprise: string
  lieu: string
  type: string
  description: string
  competences: string[]
  datePublication: string
  dateLimite?: string
  contactEmail: string
  logo?: string
}

// Utilisateurs mockés
export const users: User[] = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Marie",
    email: "marie.dupont@exemple.com",
    telephone: "+24177123456",
    role: "utilisateur",
    createdAt: "2023-01-15T08:30:00Z",
  },
  {
    id: "2",
    nom: "Administrateur",
    prenom: "Admin",
    email: "admin@modelles.ga",
    role: "admin",
    createdAt: "2022-11-01T10:00:00Z",
  },
  {
    id: "3",
    nom: "Entreprise",
    prenom: "Partenaire",
    email: "partenaire@entreprise.com",
    telephone: "+24177654321",
    role: "partenaire",
    createdAt: "2023-03-10T14:45:00Z",
  },
]

// Notifications mockées
export const notifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    titre: "Confirmation de rendez-vous",
    message: "Votre rendez-vous avec Dr. Emilie Ntoutoume a été confirmé pour le 10 juin à 14h00.",
    lue: false,
    type: "info",
    createdAt: "2023-06-05T09:15:00Z",
    lien: "/rendez-vous",
  },
  {
    id: "2",
    userId: "1",
    titre: "Rappel d'atelier",
    message: "L'atelier Gestion du stress et relaxation aura lieu demain à 16h00.",
    lue: true,
    type: "info",
    createdAt: "2023-06-01T11:30:00Z",
    lien: "/psychologique/ateliers/gestion-du-stress-et-relaxation",
  },
  {
    id: "3",
    userId: "1",
    titre: "Confirmation d'inscription",
    message: "Votre inscription au groupe de soutien Survivantes de violences a été confirmée.",
    lue: false,
    type: "succès",
    createdAt: "2023-05-28T15:45:00Z",
    lien: "/psychologique/groupes/survivantes-de-violences",
  },
  {
    id: "4",
    userId: "3",
    titre: "Nouvelle candidature",
    message: "Vous avez reçu une nouvelle candidature pour votre annonce Assistante administrative.",
    lue: false,
    type: "info",
    createdAt: "2023-06-03T16:20:00Z",
    lien: "/partenaires/candidatures",
  },
]

// Centres de santé mockés
export const centresSante: CentreService[] = [
  {
    id: "1",
    nom: "Centre de Santé Modelles",
    description: "Notre centre principal offrant des services de santé reproductive et gynécologique.",
    adresse: "123 Avenue Principale, Libreville, Gabon",
    telephone: "+24177123456",
    email: "centre@modelles.ga",
    horaires: "Lundi-Vendredi: 8h-18h, Samedi: 9h-15h",
    image: "/images/centre-principal.jpg",
  },
  {
    id: "2",
    nom: "Clinique Mobile Modelles",
    description: "Notre service mobile qui se déplace dans les quartiers pour fournir des soins essentiels.",
    adresse: "Service mobile - voir calendrier pour les emplacements",
    telephone: "+24177123457",
    email: "mobile@modelles.ga",
    horaires: "Voir calendrier des déplacements",
    image: "/images/clinique-mobile.jpg",
  },
  {
    id: "3",
    nom: "Centre Jeunesse Modelles",
    description: "Centre spécialisé pour les adolescentes et jeunes femmes.",
    adresse: "45 Rue des Écoles, Libreville, Gabon",
    telephone: "+24177123458",
    email: "jeunesse@modelles.ga",
    horaires: "Lundi-Vendredi: 10h-19h, Samedi: 10h-16h",
    image: "/images/centre-jeunesse.jpg",
  },
]

// Psychologues mockés
export const psychologues: Psychologue[] = [
  {
    id: "dr-emilie-ntoutoume",
    nom: "Ntoutoume",
    prenom: "Emilie",
    titre: "Docteure en Psychologie Clinique",
    specialites: ["Traumatismes", "Violences basées sur le genre", "Thérapie cognitivo-comportementale"],
    description:
      "Dr. Emilie Ntoutoume est spécialisée dans le soutien psychologique des femmes ayant vécu des traumatismes. Avec plus de 15 ans d'expérience, elle utilise une approche centrée sur le patient combinant différentes techniques thérapeutiques.",
    photo: "/images/dr-emilie-ntoutoume.jpg",
    disponibilites: [
      { jour: "Lundi", heures: "9h-17h" },
      { jour: "Mercredi", heures: "9h-17h" },
      { jour: "Vendredi", heures: "9h-15h" },
    ],
  },
  {
    id: "dr-jean-mboumba",
    nom: "Mboumba",
    prenom: "Jean",
    titre: "Psychologue clinicien",
    specialites: ["Anxiété", "Dépression", "Thérapie familiale"],
    description:
      "Dr. Jean Mboumba est spécialisé dans le traitement des troubles anxieux et dépressifs. Il travaille particulièrement avec les adolescentes et les jeunes adultes sur les questions d'identité et de confiance en soi.",
    photo: "/images/dr-jean-mboumba.jpg",
    disponibilites: [
      { jour: "Mardi", heures: "10h-18h" },
      { jour: "Jeudi", heures: "10h-18h" },
      { jour: "Samedi", heures: "9h-13h" },
    ],
  },
  {
    id: "dr-sophie-moussavou",
    nom: "Moussavou",
    prenom: "Sophie",
    titre: "Psychothérapeute",
    specialites: ["Relations", "Estime de soi", "Thérapie systémique"],
    description:
      "Dr. Sophie Moussavou se spécialise dans l'accompagnement des femmes dans leurs relations interpersonnelles et familiales. Elle propose une approche holistique intégrant le bien-être physique et mental.",
    photo: "/images/dr-sophie-moussavou.jpg",
    disponibilites: [
      { jour: "Lundi", heures: "13h-19h" },
      { jour: "Mardi", heures: "9h-15h" },
      { jour: "Jeudi", heures: "13h-19h" },
    ],
  },
]

// Groupes de soutien mockés
export const groupes: Groupe[] = [
  {
    id: "survivantes-de-violences",
    nom: "Survivantes de violences",
    description:
      "Groupe de soutien pour les femmes ayant vécu des violences physiques, sexuelles ou psychologiques. Ce groupe offre un espace sécurisé pour partager son expérience, trouver du soutien et des stratégies de guérison.",
    dateDebut: "2023-07-01",
    horaire: "Tous les mardis de 18h à 20h",
    lieu: "Centre principal Modelles, Salle de conférence",
    animateur: "Dr. Emilie Ntoutoume",
    places: 12,
    placesRestantes: 5,
    image: "/images/groupe-survivantes.jpg",
  },
  {
    id: "meres-celibataires",
    nom: "Mères célibataires",
    description:
      "Groupe de soutien pour les mères célibataires face aux défis quotidiens. Ce groupe permet d'échanger des conseils pratiques, des ressources et du soutien émotionnel entre femmes qui vivent des situations similaires.",
    dateDebut: "2023-07-05",
    horaire: "Tous les mercredis de 17h à 19h",
    lieu: "Centre Jeunesse Modelles, Salle communautaire",
    animateur: "Dr. Sophie Moussavou",
    places: 15,
    placesRestantes: 8,
    image: "/images/groupe-meres-celibataires.jpg",
  },
  {
    id: "anxiete-et-stress",
    nom: "Anxiété et gestion du stress",
    description:
      "Groupe de soutien axé sur les techniques de gestion du stress et de l'anxiété au quotidien. Les participantes apprennent des méthodes pratiques pour réduire l'anxiété et améliorer leur bien-être mental.",
    dateDebut: "2023-07-08",
    horaire: "Tous les samedis de 10h à 12h",
    lieu: "Centre principal Modelles, Jardin zen",
    animateur: "Dr. Jean Mboumba",
    places: 10,
    placesRestantes: 3,
    image: "/images/groupe-anxiete.jpg",
  },
]

// Ateliers psychologiques mockés
export const ateliers: Atelier[] = [
  {
    id: "gestion-du-stress-et-relaxation",
    nom: "Gestion du stress et relaxation",
    description:
      "Atelier pratique pour apprendre des techniques de relaxation et de gestion du stress. Venez découvrir des méthodes simples et efficaces pour améliorer votre bien-être au quotidien.",
    date: "2023-07-15",
    horaire: "14h à 17h",
    lieu: "Centre principal Modelles, Salle polyvalente",
    animateur: "Dr. Jean Mboumba",
    places: 20,
    placesRestantes: 12,
    image: "/images/atelier-relaxation.jpg",
  },
  {
    id: "affirmation-de-soi",
    nom: "Affirmation de soi",
    description:
      "Atelier visant à développer des compétences d'affirmation de soi et de communication assertive. Apprenez à exprimer vos besoins, à poser des limites et à vous faire respecter dans différents contextes.",
    date: "2023-07-22",
    horaire: "13h à 16h",
    lieu: "Centre Jeunesse Modelles, Salle de formation",
    animateur: "Dr. Sophie Moussavou",
    places: 15,
    placesRestantes: 7,
    image: "/images/atelier-affirmation.jpg",
  },
  {
    id: "guerison-des-traumatismes",
    nom: "Guérison des traumatismes",
    description:
      "Atelier sur les étapes de guérison des traumatismes émotionnels. Cet atelier aborde les différentes phases du processus de guérison et propose des outils thérapeutiques adaptés.",
    date: "2023-07-29",
    horaire: "10h à 16h (pause déjeuner incluse)",
    lieu: "Centre principal Modelles, Salle de conférence",
    animateur: "Dr. Emilie Ntoutoume",
    places: 12,
    placesRestantes: 4,
    image: "/images/atelier-guerison.jpg",
  },
]

// Annonces d'emploi mockées
export const annonces: Annonce[] = [
  {
    id: "1",
    titre: "Assistante administrative",
    entreprise: "Crédit du Gabon",
    lieu: "Libreville",
    type: "Temps plein",
    description:
      "Nous recherchons une assistante administrative pour notre siège social à Libreville. La candidate idéale possède d'excellentes compétences organisationnelles et une bonne maîtrise des outils informatiques.",
    competences: ["Organisation", "Suite Office", "Communication", "Gestion du temps"],
    datePublication: "2023-06-01",
    dateLimite: "2023-06-30",
    contactEmail: "recrutement@creditgabon.com",
    logo: "/images/logo-credit-gabon.jpg",
  },
  {
    id: "2",
    titre: "Conseillère commerciale",
    entreprise: "Assurances Afrique",
    lieu: "Libreville, Port-Gentil",
    type: "Temps plein",
    description:
      "Rejoignez notre équipe en tant que conseillère commerciale. Vous serez responsable du développement de notre portefeuille clients et de la vente de nos produits d'assurance.",
    competences: ["Vente", "Négociation", "Prospection", "Relation client"],
    datePublication: "2023-05-25",
    dateLimite: "2023-06-25",
    contactEmail: "carriere@assurances-afrique.com",
    logo: "/images/logo-assurances-afrique.jpg",
  },
  {
    id: "3",
    titre: "Formatrice en bureautique",
    entreprise: "Centre Digital Gabon",
    lieu: "Libreville",
    type: "Temps partiel",
    description:
      "Nous cherchons une formatrice expérimentée pour animer des sessions de formation en bureautique auprès de nos bénéficiaires.",
    competences: ["Pédagogie", "Suite Office avancée", "Communication", "Patience"],
    datePublication: "2023-06-05",
    dateLimite: "2023-07-05",
    contactEmail: "info@centredigital.ga",
    logo: "/images/logo-centre-digital.jpg",
  },
  {
    id: "4",
    titre: "Responsable marketing digital",
    entreprise: "Telecom Plus",
    lieu: "Libreville",
    type: "Temps plein",
    description:
      "Dans le cadre de notre expansion, nous recherchons une responsable marketing digital pour gérer notre présence en ligne et développer notre stratégie digitale.",
    competences: ["Marketing digital", "Réseaux sociaux", "SEO/SEM", "Analyse de données"],
    datePublication: "2023-05-15",
    dateLimite: "2023-06-15",
    contactEmail: "carrieres@telecomplus.ga",
    logo: "/images/logo-telecom-plus.jpg",
  },
  {
    id: "5",
    titre: "Secrétaire médicale",
    entreprise: "Clinique de l'Espoir",
    lieu: "Libreville",
    type: "Temps plein",
    description:
      "La Clinique de l'Espoir recherche une secrétaire médicale pour la gestion des rendez-vous, l'accueil des patients et les tâches administratives.",
    competences: ["Accueil", "Gestion d'agenda", "Discrétion", "Rigueur"],
    datePublication: "2023-06-10",
    contactEmail: "recrutement@clinique-espoir.ga",
    logo: "/images/logo-clinique-espoir.jpg",
  },
  {
    id: "6",
    titre: "Chargée de projets sociaux",
    entreprise: "Fondation Avenir Gabon",
    lieu: "Libreville, possibilité de déplacements",
    type: "Temps plein",
    description:
      "Nous recrutons une chargée de projets sociaux pour coordonner nos initiatives d'autonomisation des femmes dans les communautés rurales.",
    competences: [
      "Gestion de projet",
      "Connaissance du milieu associatif",
      "Rédaction de rapports",
      "Travail d'équipe",
    ],
    datePublication: "2023-06-07",
    dateLimite: "2023-07-07",
    contactEmail: "emplois@fondation-avenir.org",
    logo: "/images/logo-fondation-avenir.jpg",
  },
]

// Rendez-vous mockés
export const rendezVous: RendezVous[] = [
  {
    id: "1",
    userId: "1",
    serviceName: "Consultation gynécologique",
    date: "2023-06-15T10:30:00Z",
    statut: "confirmé",
  },
  {
    id: "2",
    userId: "1",
    serviceName: "Psychologue - Dr. Emilie Ntoutoume",
    date: "2023-06-20T14:00:00Z",
    statut: "confirmé",
  },
  {
    id: "3",
    userId: "1",
    serviceName: "Dépistage IST",
    date: "2023-06-25T11:00:00Z",
    statut: "en attente",
  },
]

// Fonction pour simuler une attente comme lors d'un appel API
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fonction simulant un appel API avec possibilité d'erreur aléatoire
export async function fetchData<T>(data: T, errorRate = 0.05): Promise<T> {
  await delay(Math.random() * 500 + 200) // Délai aléatoire entre 200 et 700ms

  if (Math.random() < errorRate) {
    throw new Error("Erreur de communication avec le serveur")
  }

  return data
}

// Export d'un objet mockApi pour remplacer l'API
export const mockApi = {
  // Utilisateurs
  getUser: async (id: string) => {
    const user = users.find((u) => u.id === id)
    if (!user) throw new Error("Utilisateur non trouvé")
    return await fetchData(user)
  },

  login: async (email: string, password: string) => {
    const user = users.find((u) => u.email === email)
    if (!user) throw new Error("Identifiants incorrects")
    return await fetchData({
      user,
      token: "mock-token-" + Date.now(),
    })
  },

  register: async (userData: Partial<User>) => {
    const newUser = {
      id: String(users.length + 1),
      nom: userData.nom || "",
      prenom: userData.prenom || "",
      email: userData.email || "",
      telephone: userData.telephone,
      role: "utilisateur" as const,
      createdAt: new Date().toISOString(),
    }
    return await fetchData({
      user: newUser,
      token: "mock-token-" + Date.now(),
    })
  },

  // Notifications
  getNotifications: async (userId: string) => {
    const userNotifs = notifications.filter((n) => n.userId === userId)
    return await fetchData(userNotifs)
  },

  markAsRead: async (notificationId: string) => {
    const notification = notifications.find((n) => n.id === notificationId)
    if (!notification) throw new Error("Notification non trouvée")
    notification.lue = true
    return await fetchData(notification)
  },

  // Centres de santé
  getCentresSante: async () => {
    return await fetchData(centresSante)
  },

  // Psychologues
  getPsychologues: async () => {
    return await fetchData(psychologues)
  },

  getPsychologue: async (id: string) => {
    const psychologue = psychologues.find((p) => p.id === id)
    if (!psychologue) throw new Error("Psychologue non trouvé")
    return await fetchData(psychologue)
  },

  // Groupes de soutien
  getGroupes: async () => {
    return await fetchData(groupes)
  },

  getGroupe: async (id: string) => {
    const groupe = groupes.find((g) => g.id === id)
    if (!groupe) throw new Error("Groupe non trouvé")
    return await fetchData(groupe)
  },

  inscrireGroupe: async (groupeId: string, userData: any) => {
    const groupe = groupes.find((g) => g.id === groupeId)
    if (!groupe) throw new Error("Groupe non trouvé")
    if (groupe.placesRestantes <= 0) throw new Error("Plus de places disponibles")
    groupe.placesRestantes -= 1
    return await fetchData({
      success: true,
      message: "Inscription confirmée",
    })
  },

  // Ateliers
  getAteliers: async () => {
    return await fetchData(ateliers)
  },

  getAtelier: async (id: string) => {
    const atelier = ateliers.find((a) => a.id === id)
    if (!atelier) throw new Error("Atelier non trouvé")
    return await fetchData(atelier)
  },

  inscrireAtelier: async (atelierId: string, userData: any) => {
    const atelier = ateliers.find((a) => a.id === atelierId)
    if (!atelier) throw new Error("Atelier non trouvé")
    if (atelier.placesRestantes <= 0) throw new Error("Plus de places disponibles")
    atelier.placesRestantes -= 1
    return await fetchData({
      success: true,
      message: "Inscription confirmée",
    })
  },

  // Annonces
  getAnnonces: async () => {
    return await fetchData(annonces)
  },

  getAnnonce: async (id: string) => {
    const annonce = annonces.find((a) => a.id === id)
    if (!annonce) throw new Error("Annonce non trouvée")
    return await fetchData(annonce)
  },

  postulerAnnonce: async (annonceId: string, candidature: any) => {
    const annonce = annonces.find((a) => a.id === annonceId)
    if (!annonce) throw new Error("Annonce non trouvée")
    return await fetchData({
      success: true,
      message: "Candidature envoyée avec succès",
      id: Date.now().toString(),
    })
  },

  // Rendez-vous
  getRendezVous: async (userId: string) => {
    const rdvs = rendezVous.filter((r) => r.userId === userId)
    return await fetchData(rdvs)
  },

  prendreRendezVous: async (data: Partial<RendezVous>) => {
    const newRdv = {
      id: Date.now().toString(),
      userId: data.userId || "1",
      serviceName: data.serviceName || "",
      date: data.date || new Date().toISOString(),
      statut: "en attente" as const,
    }
    return await fetchData({
      success: true,
      message: "Rendez-vous créé avec succès",
      rendezVous: newRdv,
    })
  },

  // Utilitaire pour créer des données mock plus réalistes
  generateMockData: {
    // Fonction pour générer un utilisateur aléatoire
    randomUser: () => {
      const id = Date.now().toString()
      const prenoms = ["Marie", "Sophie", "Claire", "Jeanne", "Françoise"]
      const noms = ["Dupont", "Mbarga", "Ntoutoume", "Moussavou", "Koumba"]
      return {
        id,
        nom: noms[Math.floor(Math.random() * noms.length)],
        prenom: prenoms[Math.floor(Math.random() * prenoms.length)],
        email: `user${id}@exemple.com`,
        role: "utilisateur" as const,
        createdAt: new Date().toISOString(),
      }
    },
  },
}

// Hooks pour remplacer useApi
export function useData<T>(dataFetcher: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await dataFetcher()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [dataFetcher])

  useEffect(() => {
    fetchData()
  }, [...dependencies, fetchData])

  return { data, isLoading, error, refetch: fetchData }
}

// Import nécessaire
import { useState, useEffect, useCallback } from "react"
