import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, X } from "lucide-react"

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

// Données fictives pour une annonce spécifique
const annonceDetail: AnnonceDetail = {
  id: "1",
  titre: "Formation en développement web",
  type: "formation",
  description:
    "Formation complète de 3 mois pour apprendre le développement web front-end et back-end. Cette formation s'adresse aux femmes souhaitant se reconvertir dans le domaine du numérique. Aucun prérequis technique n'est nécessaire, seulement une forte motivation et une appétence pour la technologie.",
  lieu: "Paris, 11ème arrondissement",
  date: "2023-09-15",
  dateFin: "2023-12-15",
  statut: "active",
  image: "/placeholder.svg?height=300&width=600",
  details: {
    Durée: "3 mois (420 heures)",
    Modalité: "Présentiel",
    Certification: "Titre RNCP niveau 5",
    Financement: "Éligible CPF, Pôle Emploi",
    "Places disponibles": "15",
    "Date limite d'inscription": "31 août 2023",
  },
}

export default function ModifierAnnoncePage({ params }: { params: { id: string } }) {
  // Dans une application réelle, vous récupéreriez les détails de l'annonce en fonction de l'ID
  const annonce = annonceDetail;
  
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
                    <option value="evenement">\
