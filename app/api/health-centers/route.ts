import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/health-centers - Récupérer tous les centres de santé
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const city = searchParams.get("city")
    const service = searchParams.get("service")

    // Construire les filtres
    const filters: any = {
      isVerified: true,
    }

    if (city) {
      filters.city = {
        contains: city,
        mode: "insensitive",
      }
    }

    if (service) {
      filters.services = {
        has: service,
      }
    }

    // Récupérer les centres de santé
    const healthCenters = await prisma.healthCenter.findMany({
      where: filters,
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(healthCenters)
  } catch (error) {
    console.error("Erreur lors de la récupération des centres de santé:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// POST /api/health-centers - Créer un centre de santé (admin seulement)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { name, address, city, phoneNumber, email, website, services, description, imageUrl, latitude, longitude } =
      body

    // Validation des champs
    if (!name || !address || !city) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Créer le centre de santé
    const healthCenter = await prisma.healthCenter.create({
      data: {
        name,
        address,
        city,
        phoneNumber,
        email,
        website,
        services: services || [],
        description,
        imageUrl,
        latitude,
        longitude,
        isVerified: true,
      },
    })

    return NextResponse.json(healthCenter, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création du centre de santé:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
