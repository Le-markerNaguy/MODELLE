import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/cycle - Récupérer les données de cycle de l'utilisateur
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    // Construire les filtres
    const filters: any = {
      userId: session.user.id,
    }

    if (startDate && endDate) {
      filters.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    // Récupérer les données de cycle
    const cycleData = await prisma.cycleData.findMany({
      where: filters,
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(cycleData)
  } catch (error) {
    console.error("Erreur lors de la récupération des données de cycle:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// POST /api/cycle - Ajouter des données de cycle
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { date, periodStart, periodEnd, symptoms, flow, notes } = body

    // Validation des champs
    if (!date) {
      return NextResponse.json({ error: "La date est obligatoire" }, { status: 400 })
    }

    // Vérifier si des données existent déjà pour cette date
    const existingData = await prisma.cycleData.findFirst({
      where: {
        userId: session.user.id,
        date: new Date(date),
      },
    })

    let cycleData

    if (existingData) {
      // Mettre à jour les données existantes
      cycleData = await prisma.cycleData.update({
        where: { id: existingData.id },
        data: {
          periodStart: periodStart !== undefined ? periodStart : existingData.periodStart,
          periodEnd: periodEnd !== undefined ? periodEnd : existingData.periodEnd,
          symptoms: symptoms || existingData.symptoms,
          flow: flow || existingData.flow,
          notes: notes !== undefined ? notes : existingData.notes,
        },
      })
    } else {
      // Créer de nouvelles données
      cycleData = await prisma.cycleData.create({
        data: {
          userId: session.user.id,
          date: new Date(date),
          periodStart: periodStart || false,
          periodEnd: periodEnd || false,
          symptoms: symptoms || [],
          flow,
          notes,
        },
      })
    }

    return NextResponse.json(cycleData, { status: existingData ? 200 : 201 })
  } catch (error) {
    console.error("Erreur lors de l'ajout des données de cycle:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
