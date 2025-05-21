import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/resources - Récupérer toutes les ressources éducatives
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const isPublished = searchParams.get("isPublished") !== "false"

    // Construire les filtres
    const filters: any = {}

    if (category) {
      filters.category = category
    }

    if (searchParams.has("isPublished")) {
      filters.isPublished = isPublished
    }

    // Récupérer les ressources
    const resources = await prisma.educationalResource.findMany({
      where: filters,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(resources)
  } catch (error) {
    console.error("Erreur lors de la récupération des ressources:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// POST /api/resources - Créer une ressource éducative (admin seulement)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, content, category, imageUrl, documentUrl, videoUrl } = body

    // Validation des champs
    if (!title || !description || !content || !category) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Créer la ressource
    const resource = await prisma.educationalResource.create({
      data: {
        title,
        description,
        content,
        category,
        imageUrl,
        documentUrl,
        videoUrl,
        isPublished: true,
      },
    })

    return NextResponse.json(resource, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de la ressource:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
