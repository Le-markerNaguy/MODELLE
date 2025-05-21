import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/notifications - Récupérer les notifications de l'utilisateur
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const isRead = searchParams.get("isRead") === "true"

    // Construire les filtres
    const filters: any = {
      userId: session.user.id,
    }

    if (searchParams.has("isRead")) {
      filters.isRead = isRead
    }

    // Récupérer les notifications
    const notifications = await prisma.notification.findMany({
      where: filters,
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    // Compter les notifications non lues
    const unreadCount = await prisma.notification.count({
      where: {
        userId: session.user.id,
        isRead: false,
      },
    })

    return NextResponse.json({
      notifications,
      unreadCount,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// POST /api/notifications - Créer une notification (admin seulement)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { userId, title, message, type, link } = body

    // Validation des champs
    if (!userId || !title || !message || !type) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Créer la notification
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        link,
        isRead: false,
      },
    })

    return NextResponse.json(notification, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de la notification:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
