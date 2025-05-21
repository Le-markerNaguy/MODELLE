import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// POST /api/notifications/[id]/read - Marquer une notification comme lue
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer la notification
    const notification = await prisma.notification.findUnique({
      where: { id: params.id },
    })

    if (!notification) {
      return NextResponse.json({ error: "Notification non trouvée" }, { status: 404 })
    }

    // Vérifier l'autorisation
    if (notification.userId !== session.user.id) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    // Marquer la notification comme lue
    const updatedNotification = await prisma.notification.update({
      where: { id: params.id },
      data: {
        isRead: true,
      },
    })

    return NextResponse.json(updatedNotification)
  } catch (error) {
    console.error("Erreur lors du marquage de la notification:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
