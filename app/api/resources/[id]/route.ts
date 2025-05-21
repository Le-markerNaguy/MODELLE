import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/resources/[id] - Récupérer une ressource éducative
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Récupérer la ressource
    const resource = await prisma.educationalResource.findUnique({
      where: { id: params.id },
    })

    if (!resource) {
      return NextResponse.json({ error: "Ressource non trouvée" }, { status: 404 })
    }

    return NextResponse.json(resource)
  } catch (error) {
    console.error("Erreur lors de la récupération de la ressource:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// PATCH /api/resources/[id] - Mettre à jour une ressource éducative (admin seulement)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, content, category, imageUrl, documentUrl, videoUrl, isPublished } = body

    // Mettre à jour la ressource
    const updatedResource = await prisma.educationalResource.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(content && { content }),
        ...(category && { category }),
        ...(imageUrl && { imageUrl }),
        ...(documentUrl !== undefined && { documentUrl }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(isPublished !== undefined && { isPublished }),
      },
    })

    return NextResponse.json(updatedResource)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la ressource:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// DELETE /api/resources/[id] - Supprimer une ressource éducative (admin seulement)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Supprimer la ressource
    await prisma.educationalResource.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Ressource supprimée avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression de la ressource:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
