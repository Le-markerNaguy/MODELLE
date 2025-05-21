import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/support-groups - Récupérer tous les groupes de soutien
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const isActive = searchParams.get("isActive") !== "false"
    const facilitatorId = searchParams.get("facilitatorId")

    // Construire les filtres
    const filters: any = {}

    if (searchParams.has("isActive")) {
      filters.isActive = isActive
    }

    if (facilitatorId) {
      filters.facilitatorId = facilitatorId
    }

    // Récupérer les groupes de soutien
    const supportGroups = await prisma.supportGroup.findMany({
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
            subscriptions: {
              where: {
                status: "ACTIVE",
              },
            },
          },
        },
      },
      orderBy: {
        startDate: "asc",
      },
    })

    // Transformer les données pour inclure le nombre de participants
    const transformedGroups = supportGroups.map((group) => ({
      ...group,
      currentParticipants: group._count.subscriptions,
      _count: undefined,
    }))

    return NextResponse.json(transformedGroups)
  } catch (error) {
    console.error("Erreur lors de la récupération des groupes de soutien:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// POST /api/support-groups - Créer un groupe de soutien (admin seulement)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, facilitatorId, maxParticipants, schedule, location, startDate, endDate, imageUrl } = body

    // Validation des champs
    if (!name || !description || !facilitatorId || !maxParticipants || !schedule || !location || !startDate) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Créer le groupe de soutien
    const supportGroup = await prisma.supportGroup.create({
      data: {
        name,
        description,
        facilitatorId,
        maxParticipants,
        schedule,
        location,
        startDate: new Date(startDate),
        ...(endDate && { endDate: new Date(endDate) }),
        imageUrl,
        isActive: true,
      },
    })

    return NextResponse.json(supportGroup, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création du groupe de soutien:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
