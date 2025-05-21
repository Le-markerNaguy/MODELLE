// lib/auth.ts
import type { NextAuthOptions, DefaultSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

// 1. Extension des types NextAuth
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
  }

  interface JWT {
    id?: string
    role?: string
  }
}

export const authOptions: NextAuthOptions = {
  // 2. Configuration de l'adapter Prisma
  adapter: PrismaAdapter(prisma),
  
  // 3. Configuration de la session JWT
  session: {
    strategy: "jwt",
  },

  // 4. Configuration des pages personnalisées
  pages: {
    signIn: "/connexion",
    signOut: "/",
    error: "/connexion",
  },

  // 5. Configuration des providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        // 6. Validation des credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Veuillez fournir un email et un mot de passe")
        }

        // 7. Recherche de l'utilisateur
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        console.log('Tentative de connexion pour', credentials.email)
        console.log('Utilisateur trouvé ?', !!user)

        if (!user) {
          throw new Error("Aucun utilisateur trouvé avec cet email")
        }

        // 8. Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )
        console.log('Mot de passe correct ?', isPasswordValid)

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect")
        }

        // 9. Retour des informations utilisateur
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        }
      },
    }),
  ],

  // 10. Configuration des callbacks
  callbacks: {
    async jwt({ token, user }) {
      // 11. Ajout des claims JWT
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      // 12. Ajout des infos à la session
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  // 13. Configuration du secret
  secret: process.env.NEXTAUTH_SECRET,

  // 14. Configuration supplémentaire
  debug: process.env.NODE_ENV === "development",
}