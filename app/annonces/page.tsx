"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin, Clock, Search, Filter, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Adapter l'interface pour supporter les champs de la BDD et fallback sur les anciens champs
interface Annonce {
  id: string
  titre?: string
  title?: string
  description?: string
  content?: string
  organisation?: string
  organization?: { name: string }
  lieu?: string
  location?: string
  date?: string
  startDate?: string
  lien?: string
}

export default function AnnoncesPage() {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnnonces() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/announcements")
        if (!res.ok) throw new Error("Erreur lors du chargement des annonces")
        const data = await res.json()
        setAnnonces(data)
      } catch (e: any) {
        setError(e.message || "Erreur inconnue")
      } finally {
        setLoading(false)
      }
    }
    fetchAnnonces()
  }, [])

  if (loading) return <div className="container py-10">Chargement des annonces…</div>
  if (error) return <div className="container py-10 text-red-500">{error}</div>

  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Annonces</h1>
      <div className="space-y-6">
        {annonces.map((annonce) => (
          <div key={annonce.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h2 className="font-semibold text-lg">{annonce.title || annonce.titre}</h2>
              <div className="text-sm text-muted-foreground mb-1">{annonce.organization?.name || annonce.organisation} - {annonce.location || annonce.lieu}</div>
              <div className="text-xs text-muted-foreground mb-2">{annonce.startDate ? new Date(annonce.startDate).toLocaleDateString() : annonce.date}</div>
              <p className="text-sm mb-2">{annonce.content || annonce.description}</p>
            </div>
            <a href={annonce.lien || `/annonces/${annonce.id}`} className="mt-2 md:mt-0 inline-block bg-modelles-600 text-white px-4 py-2 rounded hover:bg-modelles-700 transition-colors text-sm font-medium">S'inscrire</a>
          </div>
        ))}
      </div>
    </div>
  )
}
