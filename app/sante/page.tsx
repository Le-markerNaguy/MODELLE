"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ResourceCard } from "@/components/resource-card"
import { HealthCenterCard } from "@/components/health-center-card"
import { CycleCalculator } from "@/components/cycle-calculator"
import { useState, useEffect } from "react"

// Type pour les centres de santé
interface Center {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  services: string[]
}

export default function SantePage() {
  const [selectedCenter, setSelectedCenter] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [healthCenters, setHealthCenters] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch("/api/health-centers")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger les centres de santé")
        return res.json()
      })
      .then((data) => {
        setHealthCenters(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Filtrer les centres de santé en fonction du terme de recherche
  const filteredCenters = healthCenters.filter(
    (center) =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (center.services && center.services.some((service: string) => service.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Préparer les données pour la carte
  const mapCenters: Center[] = filteredCenters.map((center) => ({
    id: center.id,
    name: center.name,
    address: center.address,
    lat: center.lat,
    lng: center.lng,
    services: center.services,
  }))

  return (
    <div className="container py-10 max-w-6xl mx-auto px-4">
      {/* Header Section */}
      <header className="flex flex-col items-center text-center mb-10 space-y-4">
        <div className="p-3 rounded-full bg-pink-100">
          <Heart className="h-10 w-10 text-pink-600" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold">Santé Reproductive</h1>
        <p className="text-muted-foreground max-w-2xl">
          Suivez votre cycle menstruel, accédez à des ressources de santé reproductive et trouvez des centres de santé
          partenaires.
        </p>
      </header>

      {/* Main Content */}
      <main>
        <section className="grid gap-10 md:grid-cols-2 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Prenez le contrôle de votre santé</h2>
            <p className="text-muted-foreground mb-4">
              Mod&apos;Elles vous offre des outils pour mieux comprendre et gérer votre santé reproductive.
            </p>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Services disponibles :</h3>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                <li>Calculateur de cycle menstruel</li>
                <li>Conseils en santé reproductive</li>
                <li>Localisation des centres de santé</li>
              </ul>
            </div>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img
              src="/santéF.jpeg" // Chemin vers votre image (peut être une URL ou un chemin local)
              alt="Description de l'image"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>

        <Tabs defaultValue="cycle" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cycle">Suivi du Cycle</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
            <TabsTrigger value="centers">Centres de Santé</TabsTrigger>
          </TabsList>

          <TabsContent value="cycle">
            <CycleCalculator />
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Ressources</CardTitle>
                <CardDescription>Informations fiables pour votre santé</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
                  <ResourceCard
                    title="Le Consentement : Comprendre et Respecter"
                    type="Vidéo"
                    description="Vidéo explicative sur l'importance du consentement dans les relations"
                    link="/ressources/consentement"
                  />
                  <ResourceCard
                    title="La Valeur de l'Abstinence"
                    type="Article"
                    description="Pourquoi choisir l'abstinence : avantages et bienfaits pour les jeunes"
                    link="/ressources/abstinence"
                  />
                  <ResourceCard
                    title="Comprendre votre cycle"
                    type="Guide"
                    description="Guide complet sur les phases du cycle menstruel et leur impact sur votre corps"
                    link="/ressources/cycle"
                  />
                  <ResourceCard
                    title="Santé et Dignité - En vidéo"
                    type="Vidéo"
                    description="Une présentation vidéo sur l'importance de préserver sa dignité personnelle"
                    link="/ressources/sante-dignite"
                  />
                  <ResourceCard
                    title="Communication et Relations Saines"
                    type="Guide"
                    description="Comment établir des limites saines dans les relations"
                    link="/ressources/relations-saines"
                  />
                  <ResourceCard
                    title="Estime de Soi"
                    type="Article"
                    description="Développer une image positive de soi et prendre des décisions éclairées"
                    link="/ressources/estime-soi"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="centers">
            <Card>
              <CardHeader>
                <CardTitle>Centres de Santé</CardTitle>
                <CardDescription>Trouvez des professionnels près de chez vous</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher par nom, service ou adresse..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-4">
                  {loading && (
                    <div className="p-4 text-center">Chargement des centres de santé...</div>
                  )}
                  {error && (
                    <div className="p-4 text-center text-red-500">{error}</div>
                  )}
                  {filteredCenters.map((center) => (
                    <div
                      key={center.id}
                      className={`transition-all ${selectedCenter === center.id ? "ring-2 ring-pink-500 rounded-lg" : ""}`}
                      onClick={() => setSelectedCenter(center.id)}
                    >
                      <HealthCenterCard
                        name={center.name}
                        address={center.address}
                        services={center.services}
                        hours={center.hours}
                        distance={center.distance}
                        appointmentLink={`/rendez-vous?centerId=${center.id}`}
                        phone={center.phone}
                        available={center.available}
                      />
                    </div>
                  ))}

                  {filteredCenters.length === 0 && !loading && (
                    <div className="p-4 text-center">
                      <MapPin className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                      <p className="text-muted-foreground">Aucun centre de santé ne correspond à votre recherche</p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Carte des centres de santé</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Cliquez sur un marqueur pour voir plus d&apos;informations ou pour sélectionner un centre
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
