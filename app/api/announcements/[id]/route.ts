import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/announcements/[id] - Récupérer une annonce
export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = await Promise.resolve(context)

  try {
    // Récupérer l'annonce
    const announcement = await prisma.announcement.findUnique({
      where: { id: params.id },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            website: true,
            description: true,
          },
        },
      },
    })

    if (!announcement) {
      return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 })
    }

    // Incrémenter le compteur de vues
    await prisma.announcement.update({
      where: { id: params.id },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// PATCH /api/announcements/[id] - Mettre à jour une annonce
export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { params } = await Promise.resolve(context)

  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer l'annonce existante
    const existingAnnouncement = await prisma.announcement.findUnique({
      where: { id: params.id },
      select: {
        organizationId: true,
      },
    })

    if (!existingAnnouncement) {
      return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 })
    }

    // Vérifier l'autorisation (seul l'organisation propriétaire ou un admin peut modifier)
    if (existingAnnouncement.organizationId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, content, type, location, startDate, endDate, imageUrl, details, status } = body

    // Mettre à jour l'annonce
    const updatedAnnouncement = await prisma.announcement.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(content && { content }),
        ...(type && { type }),
        ...(location && { location }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: endDate ? new Date(endDate) : null }),
        ...(imageUrl && { imageUrl }),
        ...(details && { details }),
        ...(status && { status }),
      },
    })

    return NextResponse.json(updatedAnnouncement)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'annonce:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// DELETE /api/announcements/[id] - Supprimer une annonce
export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = await Promise.resolve(context)

  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer l'annonce
    const announcement = await prisma.announcement.findUnique({
      where: { id: params.id },
      select: {
        organizationId: true,
      },
    })

    if (!announcement) {
      return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 })
    }

    // Vérifier l'autorisation
    if (announcement.organizationId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    // Supprimer l'annonce
    await prisma.announcement.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Annonce supprimée avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression de l'annonce:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
