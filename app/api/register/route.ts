import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, password } = body

    // Validation des champs
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires" }, { status: 400 })
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 })
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "USER",
        profile: {
          create: {},
        },
        preferences: {
          create: {},
        },
      },
    })

    // Création d'une notification de bienvenue
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Bienvenue sur Mod'Elles",
        message: "Merci de vous être inscrit sur notre plateforme. Découvrez toutes nos ressources et services.",
        type: "SYSTEM",
      },
    })

    return NextResponse.json(
      {
        message: "Utilisateur créé avec succès",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de l'inscription" }, { status: 500 })
  }
}
