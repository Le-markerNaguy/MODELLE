"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "professional" | "admin"
  active: boolean
  createdAt?: string
  avatarUrl?: string
}

interface Appointment {
  id: string
  patient: {
    id: string
    name: string
    email: string
    avatarUrl?: string
  }
  professional: {
    id: string
    name: string
    specialty?: string
  }
  date: string // ISO string
  time: string // e.g. "14:30"
  type: string // e.g. "Consultation psychologique"
  status: "upcoming" | "completed" | "cancelled"
}

interface SupportGroup {
  id: string
  name: string
  description?: string
  facilitator: {
    id: string
    name: string
    avatarUrl?: string
  }
  participantsCount: number
  capacity: number
  schedule: string
  period: string
  status: "active" | "upcoming" | "completed"
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Users,
  Calendar,
  Heart,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="container py-10 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-xl">Administration</CardTitle>
              <CardDescription>Gestion de la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className={`justify-start ${activeTab === "dashboard" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Tableau de bord
                </Button>
                <Button
                  variant={activeTab === "users" ? "default" : "ghost"}
                  className={`justify-start ${activeTab === "users" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Utilisateurs
                </Button>
                <Button
                  variant={activeTab === "appointments" ? "default" : "ghost"}
                  className={`justify-start ${activeTab === "appointments" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setActiveTab("appointments")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Rendez-vous
                </Button>
                <Button
                  variant={activeTab === "groups" ? "default" : "ghost"}
                  className={`justify-start ${activeTab === "groups" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setActiveTab("groups")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Groupes de soutien
                </Button>
                <Button
                  variant={activeTab === "resources" ? "default" : "ghost"}
                  className={`justify-start ${activeTab === "resources" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setActiveTab("resources")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Ressources
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className={`justify-start ${activeTab === "settings" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "appointments" && <AppointmentsTab />}
          {activeTab === "groups" && <GroupsTab />}
          {activeTab === "resources" && <ResourcesTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}

function DashboardTab() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("/api/notifications")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des activités récentes")
        return res.json()
      })
      .then((data) => {
        // Correction ici : toujours un tableau
        setActivities(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Tableau de bord</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Select defaultValue="today">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisatrices</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">+8% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Groupes de soutien</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+2 nouveaux groupes ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ressources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">+6 nouvelles ressources</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité utilisatrices</CardTitle>
            <CardDescription>Nombre d'utilisatrices actives par jour</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-[200px] bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Graphique d'activité</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rendez-vous par service</CardTitle>
            <CardDescription>Répartition des rendez-vous par type de service</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-[200px] bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Graphique de répartition</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>Les dernières actions sur la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="text-muted-foreground">Aucune activité récente</div>
              ) : (
                activities.map((activity, idx) => (
                  <div className="flex items-start gap-4" key={activity.id || idx}>
                    <div className={`rounded-full p-2 ${activity.type === "appointment" ? "bg-pink-100" : activity.type === "user" ? "bg-pink-100" : activity.type === "group" ? "bg-pink-100" : "bg-gray-100"}`}>
                      {activity.type === "appointment" && <Calendar className="h-4 w-4 text-pink-600" />}
                      {activity.type === "user" && <Users className="h-4 w-4 text-pink-600" />}
                      {activity.type === "group" && <Heart className="h-4 w-4 text-pink-600" />}
                      {!["appointment","user","group"].includes(activity.type) && <Bell className="h-4 w-4 text-pink-600" />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title || activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.date ? timeAgo(activity.date) : ""}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function UsersTab() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs")
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gestion des utilisateurs</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-8 w-[250px]" />
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un utilisateur
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Utilisateurs</CardTitle>
              <CardDescription>Liste de tous les utilisateurs de la plateforme</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="user">Utilisatrices</SelectItem>
                <SelectItem value="professional">Professionnels</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl || "/placeholder.svg?height=40&width=40"} />
                          <AvatarFallback>{user.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role === "user" ? "Utilisatrice" : user.role === "professional" ? "Professionnel" : "Administrateur"}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={user.active ? "bg-green-500" : "bg-gray-400"}>{user.active ? "Actif" : "Inactif"}</Badge>
                    </TableCell>
                    <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <XCircle className="h-4 w-4 mr-2" />
                            {user.active ? "Désactiver" : "Activer"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function AppointmentsTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("/api/appointments")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des rendez-vous")
        return res.json()
      })
      .then((data) => {
        setAppointments(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gestion des rendez-vous</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-8 w-[250px]" />
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un rendez-vous
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Rendez-vous</CardTitle>
              <CardDescription>Liste de tous les rendez-vous programmés</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="upcoming">À venir</SelectItem>
                  <SelectItem value="completed">Terminés</SelectItem>
                  <SelectItem value="cancelled">Annulés</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="health">Santé</SelectItem>
                  <SelectItem value="psychology">Psychologie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Professionnel</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={appt.patient.avatarUrl || "/placeholder.svg?height=40&width=40"} />
                          <AvatarFallback>{appt.patient.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{appt.patient.name}</p>
                          <p className="text-xs text-muted-foreground">{appt.patient.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{appt.professional.name}</p>
                        <p className="text-xs text-muted-foreground">{appt.professional.specialty || "-"}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{new Date(appt.date).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">{appt.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{appt.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          appt.status === "upcoming"
                            ? "bg-yellow-500"
                            : appt.status === "completed"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }
                      >
                        {appt.status === "upcoming"
                          ? "À venir"
                          : appt.status === "completed"
                          ? "Terminé"
                          : "Annulé"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marquer comme terminé
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Annuler
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function GroupsTab() {
  const [groups, setGroups] = useState<SupportGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", description: "", capacity: 10, schedule: "", period: "", facilitatorId: "" })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [facilitators, setFacilitators] = useState<{ id: string; name: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    fetch("/api/support-groups")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des groupes")
        return res.json()
      })
      .then((data) => {
        setGroups(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // Charger la liste des animateurs pour le select
    fetch("/api/professionals")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setFacilitators(data.map((p: any) => ({ id: p.id, name: p.name || (p.firstName + ' ' + p.lastName) }))))
      .catch(() => setFacilitators([]))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files || files.length === 0) return
    setImageFile(files[0])
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    if (!form.name.trim()) errors.name = "Le nom du groupe est requis."
    if (!form.description.trim()) errors.description = "La description est requise."
    if (!form.schedule.trim()) errors.schedule = "L'horaire est requis."
    if (!form.period.trim()) errors.period = "La période est requise."
    if (!form.facilitatorId) errors.facilitatorId = "Veuillez sélectionner un animateur."
    if (!form.capacity || isNaN(Number(form.capacity)) || Number(form.capacity) < 1) errors.capacity = "Capacité invalide."
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setSubmitting(true)
    try {
      let imageUrl = ""
      if (imageFile) {
        const fd = new FormData()
        fd.append("file", imageFile)
        const res = await fetch("/api/resources/upload", { method: "POST", body: fd })
        if (!res.ok) throw new Error("Erreur lors de l'upload de l'image")
        imageUrl = (await res.json()).url
      }
      const res = await fetch("/api/support-groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl }),
      })
      if (!res.ok) throw new Error("Erreur lors de la création du groupe")
      toast({ title: "Groupe créé", description: "Le groupe de soutien a bien été enregistré." })
      setOpen(false)
      setForm({ name: "", description: "", capacity: 10, schedule: "", period: "", facilitatorId: "" })
      setImageFile(null)
      setFormErrors({})
      // Rafraîchir la liste
      const data = await fetch("/api/support-groups").then(r => r.json())
      setGroups(data)
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gestion des groupes de soutien</h2>
        <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Créer un groupe
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau groupe de soutien</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div>
              <Label htmlFor="name">Nom du groupe</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Ex: Groupe d'écoute et de parole" required aria-invalid={!!formErrors.name} aria-describedby="name-error" />
              {formErrors.name && <p className="text-red-500 text-xs mt-1" id="name-error">{formErrors.name}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Décrivez le but et le fonctionnement du groupe..." className="w-full border rounded p-2" rows={3} required aria-invalid={!!formErrors.description} aria-describedby="desc-error" />
              {formErrors.description && <p className="text-red-500 text-xs mt-1" id="desc-error">{formErrors.description}</p>}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="capacity">Capacité</Label>
                <Input id="capacity" name="capacity" type="number" min={1} value={form.capacity} onChange={handleChange} required aria-invalid={!!formErrors.capacity} aria-describedby="cap-error" placeholder="Nombre maximum de participants" />
                {formErrors.capacity && <p className="text-red-500 text-xs mt-1" id="cap-error">{formErrors.capacity}</p>}
              </div>
              
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="schedule">Horaire</Label>
                <Input id="schedule" name="schedule" value={form.schedule} onChange={handleChange} placeholder="Ex: Tous les mardis à 18h" required aria-invalid={!!formErrors.schedule} aria-describedby="sched-error" />
                {formErrors.schedule && <p className="text-red-500 text-xs mt-1" id="sched-error">{formErrors.schedule}</p>}
              </div>
              <div className="flex-1">
                <Label htmlFor="period">Période</Label>
                <Input id="period" name="period" value={form.period} onChange={handleChange} placeholder="Ex: Juin - Août 2025" required aria-invalid={!!formErrors.period} aria-describedby="period-error" />
                {formErrors.period && <p className="text-red-500 text-xs mt-1" id="period-error">{formErrors.period}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="image">Image du groupe</Label>
              <Input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} />
              {imageFile && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={URL.createObjectURL(imageFile)} alt="Aperçu" className="h-16 w-16 object-cover rounded" />
                  <Button type="button" variant="outline" size="sm" onClick={() => setImageFile(null)}>Retirer</Button>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={submitting} className="bg-pink-600 hover:bg-pink-700 w-full">
                {submitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Annuler</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Groupes de soutien</CardTitle>
              <CardDescription>Liste de tous les groupes de soutien</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="upcoming">À venir</SelectItem>
                <SelectItem value="completed">Terminés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du groupe</TableHead>
                  <TableHead>Animateur</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Horaire</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{group.name}</p>
                        <p className="text-xs text-muted-foreground">Groupe de soutien</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={group.facilitator.avatarUrl || "/placeholder.svg?height=40&width=40"} />
                          <AvatarFallback>{group.facilitator.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <p>{group.facilitator.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <p>{group.participantsCount}/{group.capacity}</p>
                        <Progress value={Math.round((group.participantsCount / group.capacity) * 100)} className="h-2 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{group.schedule}</p>
                        <p className="text-xs text-muted-foreground">{group.period}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        group.status === "active"
                          ? "bg-green-500"
                          : group.status === "upcoming"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }>
                        {group.status === "active"
                          ? "Actif"
                          : group.status === "upcoming"
                          ? "À venir"
                          : "Terminé"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            Voir participants
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Annuler le groupe
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface Resource {
  id: string
  title: string
  type: string
  category: string
  publishedAt: string
  views: number
  description?: string
}

function ResourcesTab() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: "", type: "", category: "", description: "", content: "" })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    fetch("/api/resources")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des ressources")
        return res.json()
      })
      .then((data) => {
        setResources(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (!files || files.length === 0) return
    if (name === "image") setImageFile(files[0])
    if (name === "document") setDocumentFile(files[0])
    if (name === "video") setVideoFile(files[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // Upload files if present
      let imageUrl = ""
      let documentUrl = ""
      let videoUrl = ""
      if (imageFile) {
        const fd = new FormData()
        fd.append("file", imageFile)
        const res = await fetch("/api/resources/upload", { method: "POST", body: fd })
        if (!res.ok) throw new Error("Erreur lors de l'upload de l'image")
        imageUrl = (await res.json()).url
      }
      if (documentFile) {
        const fd = new FormData()
        fd.append("file", documentFile)
        const res = await fetch("/api/resources/upload", { method: "POST", body: fd })
        if (!res.ok) throw new Error("Erreur lors de l'upload du document")
        documentUrl = (await res.json()).url
      }
      if (videoFile) {
        const fd = new FormData()
        fd.append("file", videoFile)
        const res = await fetch("/api/resources/upload", { method: "POST", body: fd })
        if (!res.ok) throw new Error("Erreur lors de l'upload de la vidéo")
        videoUrl = (await res.json()).url
      }
      // Créer la ressource avec les URLs
      const content = form.content && form.content.trim() ? form.content : form.description || form.title
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, content, imageUrl, documentUrl, videoUrl }),
      })
      if (!res.ok) throw new Error("Erreur lors de l'ajout de la ressource")
      toast({ title: "Ressource ajoutée", description: "La ressource a bien été enregistrée." })
      setOpen(false)
      setForm({ title: "", type: "", category: "", description: "", content: "" })
      setImageFile(null)
      setDocumentFile(null)
      setVideoFile(null)
      // Rafraîchir la liste
      const data = await fetch("/api/resources").then(r => r.json())
      setResources(data)
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gestion des ressources</h2>
        <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une ressource
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle ressource</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off">
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Titre" required />
              </div>
              <div className="flex-1">
                <Label htmlFor="type">Type</Label>
                <Input id="type" name="type" value={form.type} onChange={handleChange} placeholder="Type" required />
              </div>
              <div className="flex-1">
                <Label htmlFor="category">Catégorie</Label>
                <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="Catégorie" required />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border rounded p-2" rows={2} required />
            </div>
            <input type="hidden" name="content" value={form.content || form.description || form.title} />
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Label htmlFor="image">Image</Label>
                <Input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} />
                {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Aperçu" className="h-10 w-10 object-cover rounded mt-1" />}
              </div>
              <div className="flex-1">
                <Label htmlFor="document">Doc</Label>
                <Input id="document" name="document" type="file" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} />
                {documentFile && <span className="text-xs block mt-1">{documentFile.name}</span>}
              </div>
              <div className="flex-1">
                <Label htmlFor="video">Vidéo</Label>
                <Input id="video" name="video" type="file" accept="video/*" onChange={handleFileChange} />
                {videoFile && <span className="text-xs block mt-1">{videoFile.name}</span>}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={submitting} className="bg-pink-600 hover:bg-pink-700 w-full">
                {submitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Annuler</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ressources</CardTitle>
              <CardDescription>Liste de toutes les ressources publiées</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Date de publication</TableHead>
                  <TableHead>Vues</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{resource.title}</p>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{resource.type}</Badge>
                    </TableCell>
                    <TableCell>{resource.category}</TableCell>
                    <TableCell>{new Date(resource.publishedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{resource.views}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Mettre en avant
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Paramètres</h2>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Paramètres généraux de la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nom du site</Label>
                <Input id="site-name" defaultValue="Mod'Elles" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Description du site</Label>
                <Input
                  id="site-description"
                  defaultValue="Plateforme dédiée à la santé reproductive et au soutien psychologique des femmes au Gabon"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de contact</Label>
                <Input id="contact-email" defaultValue="contact@modelles.ga" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-phone">Numéro d'urgence</Label>
                <Input id="emergency-phone" defaultValue="XXX-XXX-XXX" />
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700">Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Gérer les notifications envoyées aux utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rappels de rendez-vous</p>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des rappels avant les rendez-vous programmés
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="24">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 heure</SelectItem>
                        <SelectItem value="3">3 heures</SelectItem>
                        <SelectItem value="24">24 heures</SelectItem>
                        <SelectItem value="48">48 heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications de groupe</p>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des notifications pour les activités de groupe
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="important">Importantes uniquement</SelectItem>
                        <SelectItem value="none">Aucune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications par email</p>
                    <p className="text-sm text-muted-foreground">Envoyer des notifications par email</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="important">Importantes uniquement</SelectItem>
                        <SelectItem value="none">Aucune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700">Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>Gérer les paramètres de sécurité de la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authentification à deux facteurs</p>
                    <p className="text-sm text-muted-foreground">
                      Exiger l'authentification à deux facteurs pour les administrateurs
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="required">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="required">Obligatoire</SelectItem>
                        <SelectItem value="optional">Optionnel</SelectItem>
                        <SelectItem value="disabled">Désactivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Durée de session</p>
                    <p className="text-sm text-muted-foreground">Durée avant déconnexion automatique par inactivité</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="60">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 heure</SelectItem>
                        <SelectItem value="120">2 heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mode urgence</p>
                    <p className="text-sm text-muted-foreground">Configuration du bouton d'urgence et des alertes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">Configurer</Button>
                  </div>
                </div>
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700">Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="api" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres API</CardTitle>
              <CardDescription>Gérer les clés API et les intégrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Clé API</p>
                    <p className="text-sm text-muted-foreground">Clé pour accéder à l'API de la plateforme</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input className="w-[300px]" value="••••••••••••••••••••••••••••••" readOnly />
                    <Button variant="outline" size="sm">
                      Régénérer
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Webhook URL</p>
                    <p className="text-sm text-muted-foreground">URL pour les notifications webhook</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input className="w-[300px]" placeholder="https://example.com/webhook" />
                    <Button variant="outline" size="sm">
                      Tester
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Intégrations</p>
                    <p className="text-sm text-muted-foreground">Gérer les intégrations tierces</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">Configurer</Button>
                  </div>
                </div>
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700">Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper pour afficher "il y a ..."
function timeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) return `Il y a ${diff} secondes`
  if (diff < 3600) return `Il y a ${Math.floor(diff/60)} minutes`
  if (diff < 86400) return `Il y a ${Math.floor(diff/3600)} heures`
  return date.toLocaleDateString()
}
