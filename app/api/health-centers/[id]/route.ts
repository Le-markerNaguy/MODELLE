import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/health-centers/[id] - Récupérer un centre de santé
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Récupérer le centre de santé
    const healthCenter = await prisma.healthCenter.findUnique({
      where: { id: params.id },
    })

    if (!healthCenter) {
      return NextResponse.json({ error: "Centre de santé non trouvé" }, { status: 404 })
    }

    return NextResponse.json(healthCenter)
  } catch (error) {
    console.error("Erreur lors de la récupération du centre de santé:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// PATCH /api/health-centers/[id] - Mettre à jour un centre de santé (admin seulement)
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
      address,
      city,
      phoneNumber,
      email,
      website,
      services,
      description,
      imageUrl,
      latitude,
      longitude,
      isVerified,
    } = body

    // Mettre à jour le centre de santé
    const updatedHealthCenter = await prisma.healthCenter.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(address && { address }),
        ...(city && { city }),
        ...(phoneNumber !== undefined && { phoneNumber }),
        ...(email !== undefined && { email }),
        ...(website !== undefined && { website }),
        ...(services && { services }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(latitude !== undefined && { latitude }),
        ...(longitude !== undefined && { longitude }),
        ...(isVerified !== undefined && { isVerified }),
      },
    })

    return NextResponse.json(updatedHealthCenter)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du centre de santé:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// DELETE /api/health-centers/[id] - Supprimer un centre de santé (admin seulement)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Supprimer le centre de santé
    await prisma.healthCenter.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Centre de santé supprimé avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression du centre de santé:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
