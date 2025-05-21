"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { CalendarClock, Clock, CheckCircle, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useData } from "@/hooks/useData"

const appointmentSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone invalide"),
  motif: z.string().min(10, "Veuillez décrire brièvement le motif de votre consultation"),
})

export default function RendezVous() {
  const searchParams = useSearchParams()
  const centerId = searchParams.get("centerId")
  const { data: session, status } = useSession()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Rediriger si non connecté
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/connexion"
    }
  }, [status])

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
  })

  const { data: appointments, isLoading: isLoadingAppointments, error: appointmentsError, refetch } = useData(
    async () => {
      if (!session || !session.user?.id) return [];
      const res = await fetch(`/api/appointments?userId=${session.user.id}`)
      if (!res.ok) throw new Error("Erreur lors du chargement des rendez-vous")
      return await res.json()
    },
    [session?.user?.id]
  )

  console.log('Session userId:', session?.user?.id)
  console.log('Appointments data:', appointments)

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]

  const onSubmit = async (data: z.infer<typeof appointmentSchema>) => {
    setIsSubmitting(true)
    try {
      if (!date || !selectedTime || !centerId) {
        let msg = "";
        if (!date) msg += "Veuillez sélectionner une date. ";
        if (!selectedTime) msg += "Veuillez choisir une heure. ";
        if (!centerId) msg += "Aucun centre sélectionné (centerId manquant dans l'URL). ";
        toast({
          title: "Erreur de saisie",
          description: msg.trim(),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      // Fusionner date et heure sélectionnée
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const fullDate = new Date(date)
      fullDate.setHours(hours, minutes, 0, 0)
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          healthCenterId: centerId,
          date: fullDate.toISOString(),
          duration: 30,
          notes: data.motif,
          type: "HEALTH",
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
        }),
      })
      // Log de debug
      console.log('API response:', res)
      let apiError = null
      if (!res.ok) {
        try {
          const err = await res.json()
          apiError = err.error || JSON.stringify(err)
          console.error('API error:', err)
        } catch {
          apiError = res.statusText
        }
        throw new Error(apiError)
      }
      toast({
        title: "Rendez-vous confirmé !",
        description: `Votre rendez-vous a été programmé pour le ${fullDate.toLocaleDateString()} à ${selectedTime}. Un email de confirmation vous a été envoyé.`,
        duration: 5000,
      })
      form.reset()
      setDate(undefined)
      setSelectedTime(null)
      await refetch() // Refresh appointments after booking
    } catch (e) {
      toast({
        title: "Erreur",
        description: e instanceof Error ? e.message : "Impossible d'enregistrer le rendez-vous.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10 max-w-4xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Prendre un rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendrier et horaires */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarClock className="h-5 w-5 text-pink-600" />
                  <h3 className="font-medium">Choisissez une date</h3>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return (
                      date < today ||
                      date.getDay() === 0 || // Dimanche
                      date.getDay() === 6 // Samedi
                    )
                  }}
                />
              </div>

              {date && (
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-pink-600" />
                    <h3 className="font-medium">Horaires disponibles</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "bg-pink-600 hover:bg-pink-700" : ""}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Formulaire */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="votre@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+241 XX XX XX XX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motif"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motif du rendez-vous</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez brièvement le motif de votre consultation"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2 pt-2">
                  <input type="checkbox" id="notifications" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="notifications" className="text-sm">
                    Recevoir des rappels de rendez-vous par email et notification
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 animate-pulse" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Confirmer le rendez-vous
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>

      {/* Liste des rendez-vous */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Mes rendez-vous</h2>
        {isLoadingAppointments && <div>Chargement des rendez-vous...</div>}
        {appointmentsError && <div className="text-red-500">{appointmentsError.message}</div>}
        {appointments && appointments.length === 0 && <div>Aucun rendez-vous trouvé.</div>}
        {appointments && appointments.length > 0 && (
          <ul className="space-y-4">
            {appointments.map((rdv: any) => (
              <li key={rdv.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold">{rdv.nom || (rdv.user?.firstName + " " + rdv.user?.lastName)}</div>
                  <div className="text-sm text-gray-600">
                    {rdv.date ? new Date(rdv.date).toLocaleString() : "-"}
                  </div>
                  <div className="text-sm">
                    {rdv.healthCenter ? (
                      <>Centre: <span className="font-medium">{rdv.healthCenter.name}</span></>
                    ) : rdv.professional ? (
                      <>Pro: <span className="font-medium">{rdv.professional.firstName} {rdv.professional.lastName}</span></>
                    ) : null}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Statut: {rdv.status}</div>
                  {rdv.notes && <div className="text-xs mt-1">Motif: {rdv.notes}</div>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
