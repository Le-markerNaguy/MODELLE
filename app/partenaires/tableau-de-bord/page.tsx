"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, FileText, Users, BarChart3, AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function TableauDeBordPartenaire() {
  const [loading, setLoading] = useState(true);
  const [partnerData, setPartnerData] = useState({
    name: "",
    activeAnnouncements: 0,
    pendingAnnouncements: 0,
    totalApplications: 0,
    newApplications: 0,
    viewsThisMonth: 0,
    viewsLastMonth: 0,
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
    },
    {
      id: 2,
      title: "Assistante administrative (H/F)",
      type: "Emploi",
      date: "08/04/2025",
      views: 124,
      applications: 7,
    },
    {
      id: 3,
      title: "Journée portes ouvertes",
      type: "Événement",
      date: "01/04/2025",
      views: 43,
      applications: 0,
    },
  ];

  const recentApplications = [
    {
      id: 1,
      name: "Marie Dupont",
      position: "Assistante administrative (H/F)",
      date: "18/04/2025",
      status: "Nouveau",
    },
    {
      id: 2,
      name: "Sophie Martin",
      position: "Assistante administrative (H/F)",
      date: "17/04/2025",
      status: "En cours",
    },
    {
      id: 3,
      name: "Lucie Bernard",
      position: "Atelier CV et Lettre de motivation",
      date: "15/04/2025",
      status: "Nouveau",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "Nouvelle candidature pour 'Assistante administrative'",
      date: "Il y a 2 heures",
      isNew: true,
    },
    {
      id: 2,
      message: "Votre annonce 'Atelier CV' a été approuvée",
      date: "Il y a 1 jour",
      isNew: false,
    },
    {
      id: 3,
      message: "Rappel: Votre événement 'Journée portes ouvertes' est dans 5 jours",
      date: "Il y a 2 jours",
      isNew: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          {loading ? (
            <Skeleton className="h-6 w-64 mt-2" />
          ) : (
            <p className="text-muted-foreground">
              Bienvenue, {partnerData.name}
            </p>
          )}
        </div>
        <Button asChild className="bg-pink-600 hover:bg-pink-700">
          <Link href="/partenaires/annonces/nouvelle">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle annonce
          </Link>
        </Button>
      </div>

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
                  {partnerData.pendingAnnouncements} en attente de validation
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
                  {partnerData.newApplications} nouvelles cette semaine
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
                <p className="text-xs text-muted-foreground mt-1">
                  {partnerData.viewsThisMonth > partnerData.viewsLastMonth 
                    ? `+${Math.round((partnerData.viewsThisMonth - partnerData.viewsLastMonth) / partnerData.viewsLastMonth * 100)}% par rapport au mois dernier`
                    : `${Math.round((partnerData.viewsThisMonth - partnerData.viewsLastMonth) / partnerData.viewsLastMonth * 100)}% par rapport au mois dernier`
                  }
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

      <Tabs defaultValue="annonces" className="space-y-4">
        <TabsList>
          <TabsTrigger value="annonces">Annonces récentes</TabsTrigger>
          <TabsTrigger value="candidatures">Candidatures récentes</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="annonces" className="space-y-4">
          <div className="rounded-md border">
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
                      <th scope="col" className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAnnouncements.map((announcement) => (
                      <tr key={announcement.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{announcement.title}</td>
                        <td className="px-6 py-4">{announcement.type}</td>
                        <td className="px-6 py-4">{announcement.date}</td>
                        <td className="px-6 py-4">{announcement.views}</td>
                        <td className="px-6 py-4">{announcement.applications}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="link" asChild className="text-pink-600 dark:text-pink-400">
                            <Link href={`/partenaires/annonces/${announcement.id}`}>
                              Voir
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href="/partenaires/annonces">
                Voir toutes les annonces
              </Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="candidatures" className="space-y-4">
          <div className="rounded-md border">
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
                      <th scope="col" className="px-6 py-3">Nom</th>
                      <th scope="col" className="px-6 py-3">Poste</th>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Statut</th>
                      <th scope="col" className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((application) => (
                      <tr key={application.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{application.name}</td>
                        <td className="px-6 py-4">{application.position}</td>
                        <td className="px-6 py-4">{application.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            application.status === "Nouveau" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}>
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="link" asChild className="text-pink-600 dark:text-pink-400">
                            <Link href={`/partenaires/candidatures/${application.id}`}>
                              Voir
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href="/partenaires/candidatures">
                Voir toutes les candidatures
              </Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <div className="rounded-md border">
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
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 ${notification.isNew ? 'bg-pink-50 dark:bg-pink-900/20' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                      </div>
                      {notification.isNew && (
                        <span className="inline-flex items-center rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                          Nouveau
                        </span>
                      )}
                \
