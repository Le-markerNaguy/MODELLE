import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET /api/professionals/[id] - Récupérer un professionnel
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Récupérer le professionnel
    const professional = await prisma.professional.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        specialization: true,
        bio: true,
        avatarUrl: true,
        professionalType: true,
        isVerified: true,
        availability: true,
        workshops: {
          where: {
            isActive: true,
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: "asc",
          },
          take: 5,
        },
        supportGroups: {
          where: {
            isActive: true,
          },
          orderBy: {
            startDate: "asc",
          },
          take: 5,
        },
      },
    })

    if (!professional) {
      return NextResponse.json({ error: "Professionnel non trouvé" }, { status: 404 })
    }

    return NextResponse.json(professional)
  } catch (error) {
    console.error("Erreur lors de la récupération du professionnel:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
