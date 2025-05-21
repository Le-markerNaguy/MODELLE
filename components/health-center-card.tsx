import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone } from "lucide-react"
import Link from "next/link"

interface HealthCenterCardProps {
  name: string
  address: string
  services: string[]
  hours: string
  distance: string
  appointmentLink: string
  phone: string
  available: boolean
}

export function HealthCenterCard({
  name,
  address,
  services,
  hours,
  distance,
  appointmentLink,
  phone,
  available,
}: HealthCenterCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-base">{name}</h3>
            <Badge variant={available ? "default" : "secondary"} className={available ? "bg-green-600" : ""}>
              {available ? "Disponible" : "Complet"}
            </Badge>
          </div>

          <div className="flex items-start gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{address}</span>
            <span className="ml-auto text-xs">({distance})</span>
          </div>

          <div className="flex items-start gap-1 text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{hours}</span>
          </div>

          <div className="flex items-start gap-1 text-sm text-muted-foreground mb-3">
            <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{phone}</span>
          </div>

          <div className="mb-3">
            <div className="text-xs font-medium mb-1">Services:</div>
            <div className="flex flex-wrap gap-1">
              {services.map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <Link href={appointmentLink}>
              <Button className="w-full bg-pink-600 hover:bg-pink-700" disabled={!available}>
                {available ? "Prendre rendez-vous" : "Aucun créneau disponible"}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
