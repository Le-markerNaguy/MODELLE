import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Video, BookOpen } from "lucide-react"
import Link from "next/link"

interface ResourceCardProps {
  title: string
  type: string
  description: string
  link: string
}

export function ResourceCard({ title, type, description, link }: ResourceCardProps) {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case "vidéo":
        return <Video className="h-4 w-4" />
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "article":
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getColor = () => {
    switch (type.toLowerCase()) {
      case "vidéo":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "guide":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "article":
      default:
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
    }
  }

  return (
    <Link href={link} className="block">
      <Card className="h-full transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-base">{title}</h3>
              <Badge variant="outline" className={`flex items-center gap-1 ${getColor()}`}>
                {getIcon()}
                {type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground flex-grow">{description}</p>
            <div className="mt-4 text-xs text-right text-pink-600">Lire plus →</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
