import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// POST /api/workshops/[id]/register - S'inscrire à un atelier
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { notes } = body

    // Récupérer l'atelier
    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id },
      include: {
        facilitator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        registrations: {
          where: {
            status: "CONFIRMED",
          },
        },
      },
    })

    if (!workshop) {
      return NextResponse.json({ error: "Atelier non trouvé" }, { status: 404 })
    }

    // Vérifier si l'utilisateur est déjà inscrit
    const existingRegistration = await prisma.workshopRegistration.findFirst({
      where: {
        userId: session.user.id,
        workshopId: params.id,
      },
    })

    if (existingRegistration) {
      return NextResponse.json({ error: "Vous êtes déjà inscrit à cet atelier" }, { status: 400 })
    }

    // Déterminer le statut en fonction du nombre de participants
    const status = workshop.registrations.length < workshop.maxParticipants ? "CONFIRMED" : "PENDING"

    // Créer l'inscription
    const registration = await prisma.workshopRegistration.create({
      data: {
        userId: session.user.id,
        workshopId: params.id,
        status,
        notes,
      },
    })

    // Créer une notification pour l'utilisateur
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Inscription à l'atelier",
        message:
          status === "CONFIRMED"
            ? `Votre inscription à l'atelier "${workshop.title}" animé par ${workshop.facilitator.firstName} ${workshop.facilitator.lastName} a été confirmée.`
            : `Votre demande d'inscription à l'atelier "${workshop.title}" est en attente de confirmation.`,
        type: "WORKSHOP",
        link: `/psychologique/ateliers/${params.id}`,
      },
    })

    return NextResponse.json(registration, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de l'inscription à l'atelier:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
