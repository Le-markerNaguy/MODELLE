import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// POST /api/emergency - Créer un message d'urgence
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    const body = await req.json()
    const { content, isEmergency } = body

    // Validation des champs
    if (!content) {
      return NextResponse.json({ error: "Le contenu du message est obligatoire" }, { status: 400 })
    }

    // Créer le message
    const message = await prisma.chatMessage.create({
      data: {
        senderId: session ? session.user.id : "anonymous",
        content,
        isEmergency: isEmergency || true,
      },
    })

    // Si l'utilisateur est connecté, créer une notification pour les admins
    if (session) {
      // Récupérer tous les admins
      const admins = await prisma.user.findMany({
        where: {
          role: "ADMIN",
        },
        select: {
          id: true,
        },
      })

      // Créer une notification pour chaque admin
      for (const admin of admins) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            title: "Message d'urgence",
            message: `Un message d'urgence a été envoyé par ${session.user.name || "un utilisateur"}.`,
            type: "EMERGENCY",
            link: "/admin/emergency",
          },
        })
      }
    }

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création du message d'urgence:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// GET /api/emergency - Récupérer les messages d'urgence (admin seulement)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification et l'autorisation
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer les messages d'urgence
    const messages = await prisma.chatMessage.findMany({
      where: {
        isEmergency: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Erreur lors de la récupération des messages d'urgence:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
