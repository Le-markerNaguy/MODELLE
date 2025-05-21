import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// POST /api/support-groups/[id]/subscribe - S'inscrire à un groupe de soutien
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { notes } = body

    // Récupérer le groupe de soutien
    const supportGroup = await prisma.supportGroup.findUnique({
      where: { id: params.id },
      include: {
        facilitator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        subscriptions: {
          where: {
            status: "ACTIVE",
          },
        },
      },
    })

    if (!supportGroup) {
      return NextResponse.json({ error: "Groupe de soutien non trouvé" }, { status: 404 })
    }

    // Vérifier si l'utilisateur est déjà inscrit
    const existingSubscription = await prisma.groupSubscription.findFirst({
      where: {
        userId: session.user.id,
        groupId: params.id,
      },
    })

    if (existingSubscription) {
      return NextResponse.json({ error: "Vous êtes déjà inscrit à ce groupe" }, { status: 400 })
    }

    // Déterminer le statut en fonction du nombre de participants
    const status = supportGroup.subscriptions.length < supportGroup.maxParticipants ? "ACTIVE" : "WAITLIST"

    // Créer l'inscription
    const subscription = await prisma.groupSubscription.create({
      data: {
        userId: session.user.id,
        groupId: params.id,
        status,
        notes,
      },
    })

    // Créer une notification pour l'utilisateur
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Inscription au groupe de soutien",
        message:
          status === "ACTIVE"
            ? `Vous avez été inscrit au groupe "${supportGroup.name}" animé par ${supportGroup.facilitator.firstName} ${supportGroup.facilitator.lastName}.`
            : `Vous avez été ajouté à la liste d'attente pour le groupe "${supportGroup.name}".`,
        type: "GROUP",
        link: `/psychologique/groupes/${params.id}`,
      },
    })

    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de l'inscription au groupe de soutien:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
