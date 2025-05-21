"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Calendar,
  ChevronDown,
  Edit,
  Eye,
  Filter,
  GraduationCap,
  MoreHorizontal,
  PlusCircle,
  Search,
  Trash,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import {
  type Annonce,
  type AnnonceStatus,
  type AnnonceType,
  getAnnoncesByOrganisation,
  deleteAnnonce,
} from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AnnoncesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Récupérer les annonces de l'organisation
      const organisationAnnonces = getAnnoncesByOrganisation(user.id)
      setAnnonces(organisationAnnonces)
      setIsLoading(false)
    }
  }, [user])

  // Filtrer les annonces en fonction des critères
  const filteredAnnonces = annonces.filter((annonce) => {
    // Filtrer par statut (onglet)
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "active" && annonce.status === "active") ||
      (activeTab === "inactive" && annonce.status === "inactive") ||
      (activeTab === "pending" && annonce.status === "en_attente") ||
      (activeTab === "draft" && annonce.status === "brouillon")

    // Filtrer par terme de recherche
    const searchMatch =
      annonce.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      annonce.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtrer par type
    const typeMatch = typeFilter === "all" || annonce.type === typeFilter

    return statusMatch && searchMatch && typeMatch
  })

  // Obtenir l'icône en fonction du type d'annonce
  const getAnnonceIcon = (type: AnnonceType) => {
    switch (type) {
      case "formation":
        return <GraduationCap className="h-5 w-5 text-blue-500" />
      case "emploi":
        return <Briefcase className="h-5 w-5 text-green-500" />
      case "evenement":
        return <Calendar className="h-5 w-5 text-pink-500" />
      default:
        return <Briefcase className="h-5 w-5" />
    }
  }

  // Obtenir le badge en fonction du statut de l'annonce
  const getStatusBadge = (status: AnnonceStatus) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>
      case "en_attente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">En attente</Badge>
      case "brouillon":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Brouillon</Badge>
      default:
        return <Badge>Inconnue</Badge>
    }
  }

  const handleDeleteAnnonce = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      const success = deleteAnnonce(id)
      if (success) {
        // Mettre à jour la liste des annonces
        setAnnonces(annonces.filter((annonce) => annonce.id !== id))
        toast({
          title: "Annonce supprimée",
          description: "L'annonce a été supprimée avec succès",
        })
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression de l'annonce",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container py-10 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mes annonces</h1>
          <p className="text-muted-foreground">Gérez vos annonces de formations, emplois et événements</p>
        </div>
        <Button asChild className="bg-pink-600 hover:bg-pink-700">
          <Link href="/partenaires/annonces/nouvelle">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle annonce
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une annonce..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Type d'annonce" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="formation">Formations</SelectItem>
              <SelectItem value="emploi">Emplois</SelectItem>
              <SelectItem value="evenement">Événements</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="active">Actives</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="draft">Brouillons</TabsTrigger>
          <TabsTrigger value="inactive">Inactives</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Liste des annonces</CardTitle>
              <CardDescription>
                {filteredAnnonces.length} annonce{filteredAnnonces.length > 1 ? "s" : ""} trouvée
                {filteredAnnonces.length > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
                  ))}
                </div>
              ) : filteredAnnonces.length > 0 ? (
                <div className="space-y-4">
                  {filteredAnnonces.map((annonce) => (
                    <div
                      key={annonce.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start space-x-3 mb-4 md:mb-0">
                        <div className="p-2 bg-muted rounded-md">{getAnnonceIcon(annonce.type)}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{annonce.titre}</p>
                            {getStatusBadge(annonce.status)}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">{annonce.description}</p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>
                              {new Date(annonce.date).toLocaleDateString()}
                              {annonce.dateFin && ` - ${new Date(annonce.dateFin).toLocaleDateString()}`}
                            </span>
                            <span className="mx-2">•</span>
                            <Users className="mr-1 h-3 w-3" />
                            <span>
                              {annonce.type === "formation" || annonce.type === "evenement"
                                ? `${annonce.details.Places || 0} places`
                                : "1 poste"}
                            </span>
                            <span className="mx-2">•</span>
                            <Eye className="mr-1 h-3 w-3" />
                            <span>{annonce.vues} vues</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/partenaires/annonces/${annonce.id}`}>
                            <Eye className="mr-1 h-4 w-4" />
                            Voir
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/partenaires/annonces/${annonce.id}/modifier`}>
                            <Edit className="mr-1 h-4 w-4" />
                            Modifier
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteAnnonce(annonce.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 text-muted-foreground mb-4">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-medium">Aucune annonce trouvée</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm || typeFilter !== "all" || activeTab !== "all"
                      ? "Essayez de modifier vos filtres de recherche"
                      : "Commencez par créer votre première annonce"}
                  </p>
                  {!searchTerm && typeFilter === "all" && activeTab === "all" && (
                    <Button className="mt-4 bg-pink-600 hover:bg-pink-700" asChild>
                      <Link href="/partenaires/annonces/nouvelle">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Créer une annonce
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
