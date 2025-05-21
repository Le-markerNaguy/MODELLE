import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// POST /api/notifications/read-all - Marquer toutes les notifications comme lues
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Marquer toutes les notifications comme lues
    await prisma.notification.updateMany({
      where: {
        userId: session.user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    })

    return NextResponse.json({ message: "Toutes les notifications ont été marquées comme lues" })
  } catch (error) {
    console.error("Erreur lors du marquage des notifications:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
