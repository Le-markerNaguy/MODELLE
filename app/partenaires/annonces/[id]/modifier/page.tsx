"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, X } from "lucide-react"
import { useEffect, useState } from "react"

// Types pour les détails d'une annonce
type AnnonceDetail = {
  id: string
  titre: string
  type: "formation" | "emploi" | "evenement"
  description: string
  lieu: string
  date: string
  dateFin?: string
  statut: "active" | "inactive" | "en_attente"
  image?: string
  details: {
    [key: string]: string
  }
}

export default function ModifierAnnoncePage({ params }: { params: { id: string } }) {
  const [annonce, setAnnonce] = useState<AnnonceDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/announcements/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger l'annonce")
        return res.json()
      })
      .then((data) => {
        setAnnonce(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [params.id])

  if (loading) return <div className="py-10 text-center">Chargement de l'annonce…</div>
  if (error || !annonce) return <div className="py-10 text-center text-red-500">{error || "Annonce introuvable."}</div>

  return (
    <div className="container mx-auto py-8 px-4">
      {/* En-tête avec actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Link href={`/partenaires/annonces/${params.id}`}>
            <Button variant="ghost" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Retour
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-pink-600">Modifier l'annonce</h1>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Save className="h-4 w-4 mr-1" /> Enregistrer
          </Button>
          <Link href={`/partenaires/annonces/${params.id}`}>
            <Button variant="outline" className="text-gray-600">
              <X className="h-4 w-4 mr-1" /> Annuler
            </Button>
          </Link>
        </div>
      </div>

      {/* Formulaire de modification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations principales */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="titre">Titre de l'annonce</Label>
                  <Input 
                    id="titre" 
                    defaultValue={annonce.titre} 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type d'annonce</Label>
                  <select 
                    id="type" 
                    defaultValue={annonce.type}
                    className="w-full mt-1 border rounded-md px-3 py-2 bg-white text-gray-800"
                  >
                    <option value="formation">Formation</option>
                    <option value="emploi">Emploi</option>
                    <option value="evenement">Événement</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    defaultValue={annonce.description}
                    className="w-full mt-1 border rounded-md px-3 py-2 bg-white text-gray-800"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="lieu">Lieu</Label>
                  <Input 
                    id="lieu" 
                    defaultValue={annonce.lieu} 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date de début</Label>
                  <Input 
                    id="date" 
                    type="date"
                    defaultValue={annonce.date.split("T")[0]} // Formatage de la date
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dateFin">Date de fin</Label>
                  <Input 
                    id="dateFin" 
                    type="date"
                    defaultValue={annonce.dateFin ? annonce.dateFin.split("T")[0] : ""} // Formatage de la date
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="statut">Statut</Label>
                  <select 
                    id="statut" 
                    defaultValue={annonce.statut}
                    className="w-full mt-1 border rounded-md px-3 py-2 bg-white text-gray-800"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="en_attente">En attente</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input 
                    id="image" 
                    type="file"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détails supplémentaires */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Détails supplémentaires</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(annonce.details).map(([key, value]) => (
                  <div key={key}>
                    <Label className="font-medium">{key}</Label>
                    <p className="mt-1 text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne latérale (facultative) */}
        <div className="hidden lg:block lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Aperçu de l'annonce</h2>
              <div className="flex flex-col items-center">
                <img 
                  src={annonce.image || "/placeholder.svg"} 
                  alt="Aperçu de l'annonce" 
                  className="w-full h-auto rounded-md mb-4"
                />
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Voir l'annonce complète
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

