import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET /api/professionals - Récupérer tous les professionnels
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const specialization = searchParams.get("specialization")
    const isVerified = searchParams.get("isVerified") === "true"

    // Construire les filtres
    const filters: any = {
      isVerified: true, // Par défaut, ne renvoyer que les professionnels vérifiés
    }

    if (type) {
      filters.professionalType = type
    }

    if (specialization) {
      filters.specialization = {
        contains: specialization,
        mode: "insensitive",
      }
    }

    if (searchParams.has("isVerified")) {
      filters.isVerified = isVerified
    }

    // Récupérer les professionnels
    const professionals = await prisma.professional.findMany({
      where: filters,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        specialization: true,
        bio: true,
        avatarUrl: true,
        professionalType: true,
        isVerified: true,
      },
    })

    return NextResponse.json(professionals)
  } catch (error) {
    console.error("Erreur lors de la récupération des professionnels:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
