import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/workshops - Récupérer tous les ateliers
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const isActive = searchParams.get("isActive") !== "false"
    const facilitatorId = searchParams.get("facilitatorId")
    const upcoming = searchParams.get("upcoming") === "true"

    // Construire les filtres
    const filters: any = {}

    if (searchParams.has("isActive")) {
      filters.isActive = isActive
    }

    if (facilitatorId) {
      filters.facilitatorId = facilitatorId
    }

    if (upcoming) {
      filters.date = {
        gte: new Date(),
      }
    }

    // Récupérer les ateliers
    const workshops = await prisma.workshop.findMany({
      where: filters,
      include: {
        facilitator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
          },
        },
        _count: {
          select: {
            registrations: {
              where: {
                status: "CONFIRMED",
              },
            },
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    })

    // Transformer les données pour inclure le nombre de participants
    const transformedWorkshops = workshops.map((workshop) => ({
      ...workshop,
      currentParticipants: workshop._count.registrations,
      _count: undefined,
    }))

    return NextResponse.json(transformedWorkshops)
  } catch (error) {
    console.error("Erreur lors de la récupération des ateliers:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// POST /api/workshops - Créer un atelier (admin seulement)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, facilitatorId, maxParticipants, date, duration, location, imageUrl } = body

    // Validation des champs
    if (!title || !description || !facilitatorId || !maxParticipants || !date || !duration || !location) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Créer l'atelier
    const workshop = await prisma.workshop.create({
      data: {
        title,
        description,
        facilitatorId,
        maxParticipants,
        date: new Date(date),
        duration,
        location,
        imageUrl,
        isActive: true,
      },
    })

    return NextResponse.json(workshop, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de l'atelier:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
