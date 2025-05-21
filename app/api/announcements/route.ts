import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/announcements - Récupérer toutes les annonces
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status") || "ACTIVE"
    const organizationId = searchParams.get("organizationId")

    // Construire les filtres
    const filters: any = {}

    if (type) {
      filters.type = type
    }

    if (status) {
      filters.status = status
    }

    if (organizationId) {
      filters.organizationId = organizationId
    }

    // Récupérer les annonces
    const announcements = await prisma.announcement.findMany({
      where: filters,
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(announcements)
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// POST /api/announcements - Créer une annonce (organisation partenaire seulement)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, content, type, location, startDate, endDate, imageUrl, details, organizationId } = body

    // Validation des champs
    if (!title || !description || !type || !startDate || !organizationId) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Créer l'annonce
    const announcement = await prisma.announcement.create({
      data: {
        title,
        description,
        content,
        type,
        organizationId,
        location,
        startDate: new Date(startDate),
        ...(endDate && { endDate: new Date(endDate) }),
        imageUrl,
        details,
        status: "PENDING", // Les annonces doivent être approuvées par un admin
      },
    })

    return NextResponse.json(announcement, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
