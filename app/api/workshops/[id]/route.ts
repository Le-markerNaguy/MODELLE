import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/workshops/[id] - Récupérer un atelier
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Récupérer l'atelier
    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id },
      include: {
        facilitator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
            bio: true,
            avatarUrl: true,
          },
        },
        registrations: {
          where: {
            status: "CONFIRMED",
          },
          select: {
            id: true,
            status: true,
            registeredAt: true,
          },
        },
      },
    })

    if (!workshop) {
      return NextResponse.json({ error: "Atelier non trouvé" }, { status: 404 })
    }

    // Ajouter le nombre de participants
    const workshopWithCount = {
      ...workshop,
      currentParticipants: workshop.registrations.length,
    }

    return NextResponse.json(workshopWithCount)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'atelier:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// PATCH /api/workshops/[id] - Mettre à jour un atelier (admin seulement)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, facilitatorId, maxParticipants, date, duration, location, imageUrl, isActive } = body

    // Mettre à jour l'atelier
    const updatedWorkshop = await prisma.workshop.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(facilitatorId && { facilitatorId }),
        ...(maxParticipants && { maxParticipants }),
        ...(date && { date: new Date(date) }),
        ...(duration && { duration }),
        ...(location && { location }),
        ...(imageUrl && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json(updatedWorkshop)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'atelier:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
