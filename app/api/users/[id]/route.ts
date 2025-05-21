import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET /api/users/[id] - Récupérer un utilisateur
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier l'autorisation (l'utilisateur ne peut accéder qu'à ses propres données)
    if (session.user.id !== params.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    // Récupérer l'utilisateur avec son profil
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        profile: true,
        preferences: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Ne pas renvoyer le mot de passe
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// PATCH /api/users/[id] - Mettre à jour un utilisateur
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier l'autorisation
    if (session.user.id !== params.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const body = await req.json()
    const { firstName, lastName, phoneNumber, profile, preferences } = body

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phoneNumber && { phoneNumber }),
        ...(profile && {
          profile: {
            update: profile,
          },
        }),
        ...(preferences && {
          preferences: {
            update: preferences,
          },
        }),
      },
      include: {
        profile: true,
        preferences: true,
      },
    })

    // Ne pas renvoyer le mot de passe
    const { password, ...userWithoutPassword } = updatedUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
