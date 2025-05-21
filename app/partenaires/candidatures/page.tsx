"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Briefcase,
  Calendar,
  Check,
  Download,
  Eye,
  Filter,
  GraduationCap,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// Types pour les candidatures
type CandidatureStatus = "new" | "reviewed" | "contacted" | "rejected"
type AnnonceType = "formation" | "emploi" | "evenement"

interface Candidature {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  annonce: {
    id: string
    titre: string
    type: AnnonceType
  }
  date: string
  status: CandidatureStatus
  message: string
  cv?: string
}

// Données de démonstration pour les candidatures
const candidaturesData: Candidature[] = [
  {
    id: "1",
    nom: "Kouassi",
    prenom: "Marie",
    email: "marie.k@example.com",
    telephone: "+241 XX XX XX XX",
    annonce: {
      id: "2",
      titre: "Assistante Administrative",
      type: "emploi",
    },
    date: "12/04/2024",
    status: "new",
    message:
      "Bonjour, je suis très intéressée par ce poste qui correspond parfaitement à mon profil. J'ai 3 ans d'expérience en tant qu'assistante administrative dans une entreprise similaire.",
    cv: "cv-marie-kouassi.pdf",
  },
  {
    id: "2",
    nom: "Taty",
    prenom: "Sophie",
    email: "sophie.t@example.com",
    telephone: "+241 XX XX XX XX",
    annonce: {
      id: "1",
      titre: "Formation en Entrepreneuriat Féminin",
      type: "formation",
    },
    date: "10/04/2024",
    status: "reviewed",
    message:
      "Je souhaite participer à cette formation pour développer mes compétences entrepreneuriales et lancer mon projet de commerce en ligne.",
  },
  {
    id: "3",
    nom: "Mba",
    prenom: "Jeanne",
    email: "jeanne.m@example.com",
    telephone: "+241 XX XX XX XX",
    annonce: {
      id: "2",
      titre: "Assistante Administrative",
      type: "emploi",
    },
    date: "09/04/2024",
    status: "contacted",
    message:
      "Je suis actuellement à la recherche d'un nouveau défi professionnel et votre offre a retenu toute mon attention. J'ai 5 ans d'expérience en tant qu'assistante de direction.",
    cv: "cv-jeanne-mba.pdf",
  },
  {
    id: "4",
    nom: "Ndong",
    prenom: "Claire",
    email: "claire.n@example.com",
    telephone: "+241 XX XX XX XX",
    annonce: {
      id: "5",
      titre: "Responsable Marketing Digital",
      type: "emploi",
    },
    date: "08/04/2024",
    status: "rejected",
    message:
      "Je suis passionnée par le marketing digital et je souhaite mettre mes compétences au service de votre entreprise. J'ai 2 ans d'expérience dans ce domaine.",
    cv: "cv-claire-ndong.pdf",
  },
  {
    id: "5",
    nom: "Obame",
    prenom: "Patricia",
    email: "patricia.o@example.com",
    telephone: "+241 XX XX XX XX",
    annonce: {
      id: "6",
      titre: "Atelier de Leadership Féminin",
      type: "evenement",
    },
    date: "07/04/2024",
    status: "new",
    message:
      "Je souhaite participer à cet atelier pour développer mes compétences en leadership et rencontrer d'autres femmes professionnelles.",
  },
  {
    id: "6",
    nom: "Ondo",
    prenom: "Sylvie",
    email: "sylvie.o@example.com",
    telephone: "+241 XX XX XX XX",
    annonce: {
      id: "1",
      titre: "Formation en Entrepreneuriat Féminin",
      type: "formation",
    },
    date: "05/04/2024",
    status: "reviewed",
    message:
      "Je suis entrepreneure débutante et cette formation me permettrait d'acquérir les compétences nécessaires pour développer mon activité.",
  },
]

export default function CandidaturesPage() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [annonceFilter, setAnnonceFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Extraire toutes les annonces uniques
  const allAnnonces = Array.from(new Set(candidaturesData.map((candidature) => candidature.annonce.id))).map(
    (annonceId) => {
      const annonce = candidaturesData.find((c) => c.annonce.id === annonceId)?.annonce
      return {
        id: annonceId,
        titre: annonce?.titre || "",
        type: annonce?.type || "emploi",
      }
    },
  )

  // Filtrer les candidatures en fonction des critères
  const filteredCandidatures = candidaturesData.filter((candidature) => {
    // Filtrer par statut (onglet)
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "new" && candidature.status === "new") ||
      (activeTab === "reviewed" && candidature.status === "reviewed") ||
      (activeTab === "contacted" && candidature.status === "contacted") ||
      (activeTab === "rejected" && candidature.status === "rejected")

    // Filtrer par terme de recherche
    const searchMatch =
      candidature.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidature.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidature.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidature.message.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtrer par annonce
    const annonceMatch = annonceFilter === "all" || candidature.annonce.id === annonceFilter

    // Filtrer par type d'annonce
    const typeMatch = typeFilter === "all" || candidature.annonce.type === typeFilter

    return statusMatch && searchMatch && annonceMatch && typeMatch
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

  // Obtenir le badge en fonction du statut de la candidature
  const getStatusBadge = (status: CandidatureStatus) => {
    switch (status) {
      case "new":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Nouvelle</Badge>
      case "reviewed":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Examinée</Badge>
      case "contacted":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Contactée</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejetée</Badge>
      default:
        return <Badge>Inconnue</Badge>
    }
  }

  return (
    <div className="container py-10 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Candidatures</h1>
          <p className="text-muted-foreground">Gérez les candidatures reçues pour vos annonces</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une candidature..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={annonceFilter} onValueChange={setAnnonceFilter}>
            <SelectTrigger className="w-full md:w-[220px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Filtrer par annonce" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les annonces</SelectItem>
              {allAnnonces.map((annonce) => (
                <SelectItem key={annonce.id} value={annonce.id}>
                  {annonce.titre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
          <TabsTrigger value="new">Nouvelles</TabsTrigger>
          <TabsTrigger value="reviewed">Examinées</TabsTrigger>
          <TabsTrigger value="contacted">Contactées</TabsTrigger>
          <TabsTrigger value="rejected">Rejetées</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Liste des candidatures</CardTitle>
              <CardDescription>
                {filteredCandidatures.length} candidature{filteredCandidatures.length > 1 ? "s" : ""} trouvée
                {filteredCandidatures.length > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredCandidatures.length > 0 ? (
                <div className="space-y-4">
                  {filteredCandidatures.map((candidature) => (
                    <div
                      key={candidature.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start space-x-3 mb-4 md:mb-0">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>
                            {candidature.prenom.charAt(0)}
                            {candidature.nom.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {candidature.prenom} {candidature.nom}
                            </p>
                            {getStatusBadge(candidature.status)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="flex items-center mr-4">
                              <Mail className="mr-1 h-3 w-3" />
                              <span>{candidature.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="mr-1 h-3 w-3" />
                              <span>{candidature.telephone}</span>
                            </div>
                          </div>
                          <div className="flex items-center mt-1">
                            {getAnnonceIcon(candidature.annonce.type)}
                            <span className="ml-1 text-sm">{candidature.annonce.titre}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="text-sm text-muted-foreground">Reçue le {candidature.date}</div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/partenaires/candidatures/${candidature.id}`}>
                              <Eye className="mr-1 h-4 w-4" />
                              Voir
                            </Link>
                          </Button>
                          {candidature.cv && (
                            <Button variant="outline" size="sm">
                              <Download className="mr-1 h-4 w-4" />
                              CV
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Envoyer un email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {candidature.status === "new" && (
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" />
                                  Marquer comme examinée
                                </DropdownMenuItem>
                              )}
                              {(candidature.status === "new" || candidature.status === "reviewed") && (
                                <DropdownMenuItem>
                                  <Phone className="mr-2 h-4 w-4" />
                                  Marquer comme contactée
                                </DropdownMenuItem>
                              )}
                              {candidature.status !== "rejected" && (
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" />
                                  Rejeter la candidature
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 text-muted-foreground mb-4">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <p className="text-sm">Aucune candidature trouvée.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
