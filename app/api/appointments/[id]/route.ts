import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/appointments/[id] - Récupérer un rendez-vous
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer le rendez-vous
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: {
        professional: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
            professionalType: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 })
    }

    // Vérifier l'autorisation (l'utilisateur ne peut accéder qu'à ses propres rendez-vous)
    if (appointment.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Erreur lors de la récupération du rendez-vous:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// PATCH /api/appointments/[id] - Mettre à jour un rendez-vous
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer le rendez-vous existant
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: {
        professional: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    if (!existingAppointment) {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 })
    }

    // Vérifier l'autorisation
    if (existingAppointment.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const body = await req.json()
    const { date, duration, notes, status } = body

    // Mettre à jour le rendez-vous
    const updatedAppointment = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        ...(date && { date: new Date(date) }),
        ...(duration && { duration }),
        ...(notes !== undefined && { notes }),
        ...(status && { status }),
      },
    })

    // Créer une notification pour l'utilisateur si le statut a changé
    if (status && status !== existingAppointment.status) {
      let message = ""

      switch (status) {
        case "CONFIRMED":
          message = `Votre rendez-vous avec ${existingAppointment.professional.firstName} ${existingAppointment.professional.lastName} a été confirmé.`
          break
        case "CANCELLED":
          message = `Votre rendez-vous avec ${existingAppointment.professional.firstName} ${existingAppointment.professional.lastName} a été annulé.`
          break
        case "COMPLETED":
          message = `Votre rendez-vous avec ${existingAppointment.professional.firstName} ${existingAppointment.professional.lastName} a été marqué comme terminé.`
          break
      }

      if (message) {
        await prisma.notification.create({
          data: {
            userId: existingAppointment.userId,
            title: "Mise à jour de rendez-vous",
            message,
            type: "APPOINTMENT",
            link: `/rendez-vous/${params.id}`,
          },
        })
      }
    }

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rendez-vous:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// DELETE /api/appointments/[id] - Supprimer un rendez-vous
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer le rendez-vous
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 })
    }

    // Vérifier l'autorisation
    if (appointment.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    // Supprimer le rendez-vous
    await prisma.appointment.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Rendez-vous supprimé avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression du rendez-vous:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
