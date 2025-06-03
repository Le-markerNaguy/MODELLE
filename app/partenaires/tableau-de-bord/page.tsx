"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, FileText, Users, BarChart3, AlertCircle, Search, ChevronDown, Bell, Settings } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function TableauDeBordPartenaire() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("annonces");
  const [partnerData, setPartnerData] = useState({
    name: "",
    activeAnnouncements: 0,
    pendingAnnouncements: 0,
    totalApplications: 0,
    newApplications: 0,
    viewsThisMonth: 0,
    viewsLastMonth: 0,
    profileCompletion: 0,
  });

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setPartnerData({
        name: "Association Femmes & Emploi",
        activeAnnouncements: 4,
        pendingAnnouncements: 1,
        totalApplications: 12,
        newApplications: 3,
        viewsThisMonth: 245,
        viewsLastMonth: 187,
        profileCompletion: 85,
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const recentAnnouncements = [
    {
      id: 1,
      title: "Atelier CV et Lettre de motivation",
      type: "Formation",
      date: "12/04/2025",
      views: 78,
      applications: 5,
      status: "active",
    },
    {
      id: 2,
      title: "Assistante administrative (H/F)",
      type: "Emploi",
      date: "08/04/2025",
      views: 124,
      applications: 7,
      status: "active",
    },
    {
      id: 3,
      title: "Journée portes ouvertes",
      type: "Événement",
      date: "01/04/2025",
      views: 43,
      applications: 0,
      status: "pending",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      name: "Marie Dupont",
      position: "Assistante administrative (H/F)",
      date: "18/04/2025",
      status: "Nouveau",
      cvUrl: "#",
    },
    {
      id: 2,
      name: "Sophie Martin",
      position: "Assistante administrative (H/F)",
      date: "17/04/2025",
      status: "En cours",
      cvUrl: "#",
    },
    {
      id: 3,
      name: "Lucie Bernard",
      position: "Atelier CV et Lettre de motivation",
      date: "15/04/2025",
      status: "Nouveau",
      cvUrl: "#",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "Nouvelle candidature pour 'Assistante administrative'",
      date: "Il y a 2 heures",
      isNew: true,
      type: "application",
    },
    {
      id: 2,
      message: "Votre annonce 'Atelier CV' a été approuvée",
      date: "Il y a 1 jour",
      isNew: false,
      type: "approval",
    },
    {
      id: 3,
      message: "Rappel: Votre événement 'Journée portes ouvertes' est dans 5 jours",
      date: "Il y a 2 jours",
      isNew: false,
      type: "reminder",
    },
  ];

  const filteredAnnouncements = recentAnnouncements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = recentApplications.filter(application =>
    application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotifications = notifications.filter(notification =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  const viewsChange = calculatePercentageChange(
    partnerData.viewsThisMonth,
    partnerData.viewsLastMonth
  );

  return (
    <div className="space-y-6">
      {/* Header avec barre de recherche et actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          {loading ? (
            <Skeleton className="h-6 w-64 mt-2" />
          ) : (
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                Bienvenue, {partnerData.name}
              </p>
              <Badge variant="outline" className="border-pink-200 text-pink-600">
                {partnerData.profileCompletion}% complet
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button asChild className="bg-pink-600 hover:bg-pink-700 shrink-0">
            <Link href="/partenaires/annonces/nouvelle">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle annonce
            </Link>
          </Button>
          
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {notifications.filter(n => n.isNew).length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">
                {notifications.filter(n => n.isNew).length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annonces actives</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">{partnerData.activeAnnouncements}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {partnerData.pendingAnnouncements} en attente
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatures</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">{partnerData.totalApplications}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {partnerData.newApplications} nouvelles
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues ce mois</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">{partnerData.viewsThisMonth}</div>
                <p className={`text-xs mt-1 ${
                  viewsChange >= 0 ? "text-green-500" : "text-red-500"
                }`}>
                  {viewsChange >= 0 ? `↑ +${viewsChange}%` : `↓ ${viewsChange}%`} vs mois dernier
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold">{notifications.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {notifications.filter(n => n.isNew).length} non lues
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="annonces" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="annonces">Annonces récentes</TabsTrigger>
            <TabsTrigger value="candidatures">Candidatures récentes</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {activeTab !== "notifications" && (
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Trier par <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Plus récent</DropdownMenuItem>
                  <DropdownMenuItem>Plus ancien</DropdownMenuItem>
                  <DropdownMenuItem>Plus de vues</DropdownMenuItem>
                  <DropdownMenuItem>Plus de candidatures</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Filtres <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Actives seulement</DropdownMenuItem>
                  <DropdownMenuItem>En attente</DropdownMenuItem>
                  <DropdownMenuItem>Emplois</DropdownMenuItem>
                  <DropdownMenuItem>Formations</DropdownMenuItem>
                  <DropdownMenuItem>Événements</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Contenu des onglets */}
        <TabsContent value="annonces" className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            {loading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3">Titre</th>
                      <th scope="col" className="px-6 py-3">Type</th>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Vues</th>
                      <th scope="col" className="px-6 py-3">Candidatures</th>
                      <th scope="col" className="px-6 py-3">Statut</th>
                      <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnnouncements.length > 0 ? (
                      filteredAnnouncements.map((announcement) => (
                        <tr key={announcement.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-6 py-4 font-medium whitespace-nowrap">
                            <Link href={`/partenaires/annonces/${announcement.id}`} className="hover:text-pink-600">
                              {announcement.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4">{announcement.type}</td>
                          <td className="px-6 py-4">{announcement.date}</td>
                          <td className="px-6 py-4">{announcement.views}</td>
                          <td className="px-6 py-4">{announcement.applications}</td>
                          <td className="px-6 py-4">
                            <Badge variant={announcement.status === "active" ? "default" : "secondary"}>
                              {announcement.status === "active" ? "Active" : "En attente"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/partenaires/annonces/${announcement.id}/editer`}>
                                Éditer
                              </Link>
                            </Button>
                            <Button variant="link" size="sm" asChild className="text-pink-600 dark:text-pink-400">
                              <Link href={`/partenaires/annonces/${announcement.id}`}>
                                Voir
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-muted-foreground">
                          Aucune annonce trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Affichage de {filteredAnnouncements.length} annonces sur {recentAnnouncements.length}
            </p>
            <Button variant="outline" asChild>
              <Link href="/partenaires/annonces">
                Voir toutes les annonces
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="candidatures" className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            {loading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3">Candidat</th>
                      <th scope="col" className="px-6 py-3">Poste</th>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Statut</th>
                      <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((application) => (
                        <tr key={application.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-6 py-4 font-medium whitespace-nowrap">
                            {application.name}
                          </td>
                          <td className="px-6 py-4">{application.position}</td>
                          <td className="px-6 py-4">{application.date}</td>
                          <td className="px-6 py-4">
                            <Badge variant={application.status === "Nouveau" ? "default" : "secondary"}>
                              {application.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={application.cvUrl} target="_blank">
                                Voir CV
                              </Link>
                            </Button>
                            <Button variant="link" size="sm" asChild className="text-pink-600 dark:text-pink-400">
                              <Link href={`/partenaires/candidatures/${application.id}`}>
                                Détails
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                          Aucune candidature trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Affichage de {filteredApplications.length} candidatures sur {recentApplications.length}
            </p>
            <Button variant="outline" asChild>
              <Link href="/partenaires/candidatures">
                Voir toutes les candidatures
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            {loading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-64" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        notification.isNew ? 'bg-pink-50 dark:bg-pink-900/20' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            {notification.type === "application" && (
                              <Users className="h-4 w-4 text-pink-600" />
                            )}
                            {notification.type === "approval" && (
                              <FileText className="h-4 w-4 text-green-600" />
                            )}
                            {notification.type === "reminder" && (
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                            )}
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                        </div>
                        {notification.isNew && (
                          <Badge variant="default" className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                            Nouveau
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Aucune notification trouvée
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {notifications.filter(n => n.isNew).length} notifications non lues
            </p>
            <Button variant="outline" onClick={() => {
              // Marquer toutes les notifications comme lues
              // (implémentation à ajouter)
            }}>
              Tout marquer comme lu
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}