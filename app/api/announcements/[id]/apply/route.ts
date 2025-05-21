import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// POST /api/announcements/[id]/apply - Postuler à une annonce
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const { coverLetter, cvUrl } = body

    // Validation des champs
    if (!coverLetter) {
      return NextResponse.json({ error: "La lettre de motivation est obligatoire" }, { status: 400 })
    }

    // Récupérer l'annonce
    const announcement = await prisma.announcement.findUnique({
      where: { id: params.id },
      include: {
        organization: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!announcement) {
      return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 })
    }

    // Vérifier si l'utilisateur a déjà postulé
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        userId: session.user.id,
        announcementId: params.id,
      },
    })

    if (existingApplication) {
      return NextResponse.json({ error: "Vous avez déjà postulé à cette annonce" }, { status: 400 })
    }

    // Créer la candidature
    const application = await prisma.jobApplication.create({
      data: {
        userId: session.user.id,
        announcementId: params.id,
        coverLetter,
        cvUrl,
        status: "PENDING",
      },
    })

    // Créer une notification pour l'utilisateur
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Candidature envoyée",
        message: `Votre candidature pour "${announcement.title}" chez ${announcement.organization.name} a été envoyée avec succès.`,
        type: "ANNOUNCEMENT",
        link: `/annonces/${params.id}`,
      },
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la candidature:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
