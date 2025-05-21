"use client"

import { use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"

export default function GroupeInscriptionPage({ params }: { params: Promise<{ slug: string }> }) {
  // Accès correct aux paramètres avec React.use()
  const { slug } = use(params)
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const [group, setGroup] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    notes: "",
    acceptTerms: false,
    notifications: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState<null | "success" | "already" | "waitlist" | "error">(null)

  // Fetch group info
  useEffect(() => {
    async function fetchGroup() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/support-groups/${slug}`)
        if (!res.ok) throw new Error("Groupe non trouvé")
        const data = await res.json()
        setGroup(data)
      } catch (e: any) {
        setError(e.message || "Erreur lors du chargement du groupe")
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      fetchGroup()
    }
  }, [slug])

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement
    const { name, value } = target
    if (target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (target as HTMLInputElement).checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      toast({ title: "Veuillez accepter les conditions." })
      return
    }
    setIsSubmitting(true)
    setRegistrationStatus(null)
    try {
      const res = await fetch(`/api/support-groups/${slug}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          notes: formData.notes,
          notifications: formData.notifications
        }),
      })
      const data = await res.json()
      
      if (res.status === 201) {
        setRegistrationStatus(data.status === "WAITLIST" ? "waitlist" : "success")
        toast({
          title: data.status === "WAITLIST" ? "Ajouté à la liste d'attente" : "Inscription réussie !",
          description: data.status === "WAITLIST"
            ? "Le groupe est complet, vous êtes sur liste d'attente."
            : `Votre inscription au groupe a été prise en compte.`,
        })
      } else if (data.error && data.error.includes("déjà inscrit")) {
        setRegistrationStatus("already")
        toast({ title: "Vous êtes déjà inscrit à ce groupe." })
      } else {
        setRegistrationStatus("error")
        toast({ 
          title: "Erreur", 
          description: data.error || "Erreur lors de l'inscription.",
          variant: "destructive"
        })
      }
    } catch (e: any) {
      setRegistrationStatus("error")
      toast({ 
        title: "Erreur", 
        description: e.message || "Une erreur inattendue est survenue",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div className="py-10 text-center">Chargement du groupe…</div>
  if (error) return <div className="py-10 text-center text-red-500">{error}</div>
  if (!group) return null

  return (
    <div className="container py-10 max-w-4xl">
      {/* Breadcrumb navigation */}
      <div className="flex items-center mb-6">
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground mr-2">
          Soutien Psychologique
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <Link href="/psychologique/groupes" className="text-muted-foreground hover:text-foreground mr-2">
          Groupes de Soutien
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <span className="font-medium">{group.name}</span>
      </div>

      {/* Main content grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Group details card */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>Groupe de soutien</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{group.description}</p>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {group.schedule} | Du {new Date(group.startDate).toLocaleDateString()} au {' '}
                    {group.endDate ? new Date(group.endDate).toLocaleDateString() : "?"}
                  </span>
                </div>
                
                <div className="text-sm">Lieu : {group.location}</div>
                <div className="text-sm">Facilitateur : {group.facilitator?.firstName} {group.facilitator?.lastName}</div>
                <div className="text-sm">
                  Participants : {group.currentParticipants} / {group.maxParticipants}
                  {group.currentParticipants >= group.maxParticipants && (
                    <span className="ml-2 text-orange-500">(Complet)</span>
                  )}
                </div>
                
                {group.topics && group.topics.length > 0 && (
                  <div className="pt-2">
                    <div className="font-semibold text-sm mb-1">Thèmes abordés :</div>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                      {group.topics.map((t: string, i: number) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration form card */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>Remplissez le formulaire pour rejoindre ce groupe</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Registration status messages */}
              {registrationStatus === "success" && (
                <div className="p-4 mb-4 bg-green-50 text-green-700 rounded-md">
                  Inscription réussie ! Vous recevrez un email de confirmation.
                </div>
              )}
              
              {registrationStatus === "already" && (
                <div className="p-4 mb-4 bg-yellow-50 text-yellow-700 rounded-md">
                  Vous êtes déjà inscrit à ce groupe.
                </div>
              )}
              
              {registrationStatus === "waitlist" && (
                <div className="p-4 mb-4 bg-orange-50 text-orange-700 rounded-md">
                  Le groupe est complet, vous êtes sur liste d'attente.
                </div>
              )}
              
              {registrationStatus === "error" && (
                <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-md">
                  Erreur lors de l'inscription. Veuillez réessayer.
                </div>
              )}

              {/* Registration form */}
              {registrationStatus !== "success" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Notes (optionnel)
                      <span className="text-muted-foreground text-xs ml-1">
                        Informations supplémentaires à partager avec l'animateur
                      </span>
                    </label>
                    <textarea
                      name="notes"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        id="acceptTerms"
                        className="mt-1"
                        disabled={isSubmitting}
                        required
                      />
                      <label htmlFor="acceptTerms" className="text-sm">
                        J'accepte les conditions de participation et le règlement intérieur du groupe
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleChange}
                        id="notifications"
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="notifications" className="text-sm">
                        Je souhaite recevoir des rappels pour les sessions par email
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || registrationStatus === "success"}
                  >
                    {isSubmitting ? "Inscription en cours..." : "S'inscrire au groupe"}
                  </button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}