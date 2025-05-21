"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronDown, Edit, MoreHorizontal, Share2, Trash, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { type Annonce, getAnnonceById, deleteAnnonce, getCandidaturesByAnnonce } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AnnoncePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [annonce, setAnnonce] = useState<Annonce | null>(null)
  const [candidaturesCount, setCandidaturesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer les détails de l'annonce
    const annonceDetails = getAnnonceById(params.id)
    if (annonceDetails) {
      setAnnonce(annonceDetails)
      
      // Récupérer le nombre de candidatures
      const candidatures = getCandidaturesByAnnonce(params.id)
      setCandidaturesCount(candidatures.length)
    }
    setIsLoading(false)
  }, [params.id])

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      const success = deleteAnnonce(params.id)
      if (success) {
        toast({
          title: "Annonce supprimée",
          description: "L'annonce a été supprimée avec succès",
        })
        router.push("/partenaires/annonces")
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression de l'annonce",
          variant: "destructive",
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10 max-w-5xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!annonce) {
    return (
      <div className="container py-10 max-w-5xl">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Annonce non trouvée</h1>
          <p className="text-muted-foreground mb-6">L'annonce que vous recherchez n'existe pas ou a été supprimée.</p>
          <Button asChild>
            <Link href="/partenaires/annonces">Retour aux annonces</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Obtenir le badge en fonction du type d'annonce
  const getTypeBadge = () => {
    switch (annonce.type) {
      case "formation":
        return <Badge className="bg-blue-100 text-blue-800">Formation</Badge>
      case "emploi":
        return <Badge className="bg-green-100 text-green-800">Emploi</Badge>
      case "evenement":
        return <Badge className="bg-pink-100 text-pink-800">Événement</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  // Obtenir le badge en fonction du statut de l'annonce
  const getStatusBadge = () => {
    switch (annonce.status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case "en_attente":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "brouillon":
        return <Badge className="bg-blue-100 text-blue-800">Brouillon</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  return (
    <div className="container py-10 max-w-5xl">
      {/* En-tête avec actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Link href="/partenaires/annonces">
            <Button variant="ghost" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Retour aux annonces
            </Button>
          </Link>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/partenaires/annonces/${annonce.id}/modifier`}>
              <Edit className="mr-1 h-4 w-4" />
              Modifier
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="mr-1 h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/partenaires/annonces/${annonce.id}/statistiques`}>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Statistiques
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/partenaires/annonces/${annonce.id}/candidatures`}>
                  <Users className="mr-2 h-4 w-4" />
                  Candidatures
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Image de couverture */}
      <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-6">
        <Image
          src={annonce.image || "/placeholder.svg?height=400&width=800"}
          alt={annonce.titre}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            {getTypeBadge()}
            {getStatusBadge()}
          </div>
          <h1 className="text-3xl font-bold text-white">{annonce.titre}</h1>
          <p className="text-white/90 mt-2">{annonce.organisation}</p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{annonce.description}</p>
              {annonce.contenu && (
                <div dangerouslySetInnerHTML={{ __html: annonce.contenu }} className="prose max-w-none" />
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>Performances de votre annonce</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold">{annonce.vues}</p>
                  <p className="text-sm text-muted-foreground">Vues</p>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold">{candidaturesCount}</p>
                  <p className="text-sm text-muted-foreground">Candidatures</p>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold">
                    {annonce.vues > 0 ? Math.round((candidaturesCount / annonce.vues) * 100) : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Taux de conversion</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href={`/partenaires/annonces/${annonce.id}/statistiques`}>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Voir les statistiques détaillées
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Candidatures</CardTitle>
              <CardDescription>
                {candidaturesCount} candidature{candidaturesCount !== 1 ? "s" : ""} reçue{candidaturesCount !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {candidaturesCount > 0 ? (
                <div className="space-y-4">\
