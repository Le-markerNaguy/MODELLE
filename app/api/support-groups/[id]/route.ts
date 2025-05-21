import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/support-groups/[id] - Récupérer un groupe de soutien
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Récupérer le groupe de soutien
    const supportGroup = await prisma.supportGroup.findUnique({
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
        subscriptions: {
          where: {
            status: "ACTIVE",
          },
          select: {
            id: true,
            status: true,
            joinedAt: true,
          },
        },
      },
    })

    if (!supportGroup) {
      return NextResponse.json({ error: "Groupe de soutien non trouvé" }, { status: 404 })
    }

    // Ajouter le nombre de participants
    const supportGroupWithCount = {
      ...supportGroup,
      currentParticipants: supportGroup.subscriptions.length,
    }

    return NextResponse.json(supportGroupWithCount)
  } catch (error) {
    console.error("Erreur lors de la récupération du groupe de soutien:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// PATCH /api/support-groups/[id] - Mettre à jour un groupe de soutien (admin seulement)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const {
      name,
      description,
      facilitatorId,
      maxParticipants,
      schedule,
      location,
      startDate,
      endDate,
      imageUrl,
      isActive,
    } = body

    // Mettre à jour le groupe de soutien
    const updatedSupportGroup = await prisma.supportGroup.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(facilitatorId && { facilitatorId }),
        ...(maxParticipants && { maxParticipants }),
        ...(schedule && { schedule }),
        ...(location && { location }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(imageUrl && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json(updatedSupportGroup)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du groupe de soutien:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
