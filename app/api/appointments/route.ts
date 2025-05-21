import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/appointments - Récupérer les rendez-vous de l'utilisateur
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
    const professionalId = searchParams.get("professionalId")
    const healthCenterId = searchParams.get("healthCenterId")
    const status = searchParams.get("status")

    // Construire les filtres
    const filters: any = {}

    if (userId) {
      // Vérifier l'authentification (l'utilisateur ne peut accéder qu'à ses propres rendez-vous)
      if (userId !== session.user.id && session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
      }
      filters.userId = userId
    }

    if (professionalId) {
      filters.professionalId = professionalId
    }

    if (healthCenterId) {
      filters.healthCenterId = healthCenterId
    }

    if (status) {
      filters.status = status
    }

    // Récupérer les rendez-vous
    const appointments = await prisma.appointment.findMany({
      where: filters,
      include: {
        healthCenter: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
          },
        },
        professional: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
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
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// POST /api/appointments - Créer un rendez-vous
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    console.log('Appointment API POST body:', body)
    const { healthCenterId, professionalId, date, duration, notes, type } = body

    // Validation des champs
    if ((!healthCenterId && !professionalId) || !date || !duration || !type) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Vérifier qu'un seul des deux est défini
    if (healthCenterId && professionalId) {
      return NextResponse.json({ error: "Veuillez choisir soit un centre de santé, soit un professionnel, pas les deux." }, { status: 400 })
    }

    // Créer le rendez-vous pour un centre de santé
    if (healthCenterId) {
      try {
        const appointment = await prisma.appointment.create({
          data: {
            userId: session.user.id,
            healthCenterId,
            professionalId: null,
            date: new Date(date),
            duration,
            notes,
            type,
            nom: body.nom,
            email: body.email,
            telephone: body.telephone,
            status: "PENDING",
          },
          include: {
            healthCenter: {
              select: {
                name: true,
                address: true,
                city: true,
              },
            },
          },
        })
        console.log('Appointment created (healthCenter):', appointment)
        await prisma.notification.create({
          data: {
            userId: session.user.id,
            title: "Rendez-vous créé",
            message: appointment.healthCenter
              ? `Votre rendez-vous au centre de santé ${appointment.healthCenter.name} a été créé et est en attente de confirmation.`
              : `Votre rendez-vous a été créé et est en attente de confirmation.`,
            type: "APPOINTMENT",
            link: `/rendez-vous/${appointment.id}`,
          },
        })
        return NextResponse.json(appointment, { status: 201 })
      } catch (err) {
        console.error('Erreur Prisma (healthCenter):', err)
        return NextResponse.json({ error: "Erreur lors de la création du rendez-vous (healthCenter)", details: String(err) }, { status: 500 })
      }
    }

    // Créer le rendez-vous pour un professionnel (psychologue, etc.)
    if (professionalId) {
      try {
        const appointment = await prisma.appointment.create({
          data: {
            userId: session.user.id,
            healthCenterId: null,
            professionalId,
            date: new Date(date),
            duration,
            notes,
            type,
            nom: body.nom,
            email: body.email,
            telephone: body.telephone,
            status: "PENDING",
          },
          include: {
            professional: {
              select: {
                firstName: true,
                lastName: true,
                specialization: true,
              },
            },
          },
        })
        console.log('Appointment created (professional):', appointment)
        await prisma.notification.create({
          data: {
            userId: session.user.id,
            title: "Rendez-vous créé",
            message: appointment.professional
              ? `Votre rendez-vous avec ${appointment.professional.firstName} ${appointment.professional.lastName} a été créé et est en attente de confirmation.`
              : `Votre rendez-vous a été créé et est en attente de confirmation.`,
            type: "APPOINTMENT",
            link: `/rendez-vous/${appointment.id}`,
          },
        })
        return NextResponse.json(appointment, { status: 201 })
      } catch (err) {
        console.error('Erreur Prisma (professional):', err)
        return NextResponse.json({ error: "Erreur lors de la création du rendez-vous (professional)", details: String(err) }, { status: 500 })
      }
    }

    return NextResponse.json({ error: "Type de rendez-vous non supporté." }, { status: 400 })
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
