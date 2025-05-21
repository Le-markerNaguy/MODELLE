// Utility functions for local storage data management

// Generic function to get data from localStorage
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue
  }

  const stored = localStorage.getItem(key)
  if (!stored) {
    return defaultValue
  }

  try {
    return JSON.parse(stored) as T
  } catch (error) {
    console.error(`Error parsing stored data for key ${key}:`, error)
    return defaultValue
  }
}

// Generic function to save data to localStorage
export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error)
  }
}

// Function to remove data from localStorage
export function removeFromStorage(key: string): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error)
    }
  }
}

// Function to generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Specific data stores

// Annonces (Announcements)
export type AnnonceType = "formation" | "emploi" | "evenement"
export type AnnonceStatus = "active" | "inactive" | "en_attente" | "brouillon"

export interface Annonce {
  id: string
  title: string
  description: string
  type: AnnonceType
  location: string
  category: string
  date: string
  dateFin?: string
  status: AnnonceStatus
  imageUrl: string
  partnerId: string
  partnerName: string
  contactEmail: string
  createdAt: string
  contenu?: string
  vues?: number
  details: {
    [key: string]: string
  }
}

export function getAnnonces(): Annonce[] {
  return getFromStorage<Annonce[]>("modelles_annonces", [])
}

export function getAnnonceById(id: string): Annonce | null {
  const annonces = getAnnonces()
  return annonces.find((annonce) => annonce.id === id) || null
}

export function getAnnoncesByOrganisation(partnerId: string): Annonce[] {
  const annonces = getAnnonces()
  return annonces.filter((annonce) => annonce.partnerId === partnerId)
}

export function saveAnnonce(annonce: Omit<Annonce, "id" | "createdAt" | "status" | "vues" | "details">): Annonce {
  const annonces = getAnnonces()
  const newAnnonce: Annonce = {
    ...annonce,
    id: generateId(),
    status: "en_attente",
    vues: 0,
    details: {},
    createdAt: new Date().toISOString(),
  }

  annonces.unshift(newAnnonce)
  saveToStorage("modelles_annonces", annonces)
  return newAnnonce
}

export function updateAnnonce(id: string, updates: Partial<Annonce>): Annonce | null {
  const annonces = getAnnonces()
  const index = annonces.findIndex((a) => a.id === id)

  if (index === -1) return null

  const updatedAnnonce = { ...annonces[index], ...updates }
  annonces[index] = updatedAnnonce
  saveToStorage("modelles_annonces", annonces)
  return updatedAnnonce
}

export function deleteAnnonce(id: string): boolean {
  const annonces = getAnnonces()
  const filtered = annonces.filter((a) => a.id !== id)

  if (filtered.length === annonces.length) return false

  saveToStorage("modelles_annonces", filtered)
  return true
}

// Candidatures (Applications)
export interface Candidature {
  id: string
  annonceId: string
  userId: string
  userName: string
  userEmail: string
  message: string
  cvUrl?: string
  createdAt: string
}

export function getCandidatures(): Candidature[] {
  return getFromStorage<Candidature[]>("modelles_candidatures", [])
}

export function getCandidaturesByAnnonce(annonceId: string): Candidature[] {
  const candidatures = getCandidatures()
  return candidatures.filter((candidature) => candidature.annonceId === annonceId)
}

// Rendez-vous (Appointments)
export interface Appointment {
  id: string
  userId: string
  userName: string
  type: "sante" | "psychologique"
  providerId: string
  providerName: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled"
  notes: string
  createdAt: string
}

export function getAppointments(): Appointment[] {
  return getFromStorage<Appointment[]>("modelles_appointments", [])
}

export function saveAppointment(appointment: Omit<Appointment, "id" | "createdAt" | "status">): Appointment {
  const appointments = getAppointments()
  const newAppointment: Appointment = {
    ...appointment,
    id: generateId(),
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  appointments.unshift(newAppointment)
  saveToStorage("modelles_appointments", appointments)
  return newAppointment
}

// Support Groups
export interface SupportGroup {
  id: string
  name: string
  description: string
  schedule: string
  location: string
  maxParticipants: number
  currentParticipants: number
  facilitatorName: string
  imageUrl: string
  createdAt: string
}

export interface GroupSubscription {
  id: string
  groupId: string
  userId: string
  userName: string
  userEmail: string
  status: "active" | "waitlist"
  joinedAt: string
}

export function getSupportGroups(): SupportGroup[] {
  return getFromStorage<SupportGroup[]>("modelles_support_groups", [])
}

export function getGroupSubscriptions(): GroupSubscription[] {
  return getFromStorage<GroupSubscription[]>("modelles_group_subscriptions", [])
}

export function subscribeToGroup(
  groupId: string,
  userId: string,
  userName: string,
  userEmail: string,
): GroupSubscription | null {
  const groups = getSupportGroups()
  const group = groups.find((g) => g.id === groupId)

  if (!group) return null

  const subscriptions = getGroupSubscriptions()

  // Check if user is already subscribed
  const existingSubscription = subscriptions.find((s) => s.groupId === groupId && s.userId === userId)

  if (existingSubscription) return existingSubscription

  // Determine status based on current participants
  const status = group.currentParticipants < group.maxParticipants ? "active" : "waitlist"

  const newSubscription: GroupSubscription = {
    id: generateId(),
    groupId,
    userId,
    userName,
    userEmail,
    status,
    joinedAt: new Date().toISOString(),
  }

  // Update group participants count if active
  if (status === "active") {
    group.currentParticipants += 1
    const groupIndex = groups.findIndex((g) => g.id === groupId)
    groups[groupIndex] = group
    saveToStorage("modelles_support_groups", groups)
  }

  subscriptions.push(newSubscription)
  saveToStorage("modelles_group_subscriptions", subscriptions)

  return newSubscription
}

// Initialize sample data if needed
export function initializeSampleData(): void {
  // Only initialize if data doesn't exist
  if (getAnnonces().length === 0) {
    const sampleAnnonces: Annonce[] = [
      {
        id: generateId(),
        title: "Formation en développement web",
        description: "Apprenez les bases du développement web avec HTML, CSS et JavaScript.",
        type: "formation",
        location: "Libreville",
        category: "Technologie",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "/placeholder.svg?height=200&width=300",
        partnerId: "partner1",
        partnerName: "Tech Academy Gabon",
        contactEmail: "contact@techacademy.ga",
        createdAt: new Date().toISOString(),
        status: "active",
        details: {},
        vues: 0,
      },
      {
        id: generateId(),
        title: "Offre d'emploi: Assistante administrative",
        description: "Nous recherchons une assistante administrative pour notre bureau à Libreville.",
        type: "emploi",
        location: "Libreville",
        category: "Administration",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "/placeholder.svg?height=200&width=300",
        partnerId: "partner2",
        partnerName: "Entreprise Gabonaise",
        contactEmail: "recrutement@entreprise.ga",
        createdAt: new Date().toISOString(),
        status: "active",
        details: {},
        vues: 0,
      },
      {
        id: generateId(),
        title: "Atelier sur la santé reproductive",
        description: "Participez à notre atelier sur la santé reproductive et le bien-être.",
        type: "evenement",
        location: "Port-Gentil",
        category: "Santé",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "/placeholder.svg?height=200&width=300",
        partnerId: "partner3",
        partnerName: "Association Santé Pour Tous",
        contactEmail: "contact@santept.ga",
        createdAt: new Date().toISOString(),
        status: "active",
        details: {},
        vues: 0,
      },
    ]

    saveToStorage("modelles_annonces", sampleAnnonces)

    // Sample support groups
    const sampleGroups: SupportGroup[] = [
      {
        id: generateId(),
        name: "Groupe de soutien pour jeunes mères",
        description: "Un espace sécurisé pour les jeunes mères pour partager leurs expériences et s'entraider.",
        schedule: "Tous les mardis, 18h-20h",
        location: "Centre communautaire de Libreville",
        maxParticipants: 15,
        currentParticipants: 8,
        facilitatorName: "Dr. Marie Ndong",
        imageUrl: "/placeholder.svg?height=200&width=300",
        createdAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: "Groupe de discussion sur la santé mentale",
        description: "Discussions ouvertes sur la santé mentale et les stratégies d'adaptation.",
        schedule: "Tous les jeudis, 17h-19h",
        location: "Centre médical de Port-Gentil",
        maxParticipants: 12,
        currentParticipants: 10,
        facilitatorName: "Psychologue Sarah Obame",
        imageUrl: "/placeholder.svg?height=200&width=300",
        createdAt: new Date().toISOString(),
      },
    ]

    saveToStorage("modelles_support_groups", sampleGroups)
  }
}
