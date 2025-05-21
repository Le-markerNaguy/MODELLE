"use client"

import type React from "react"
import { createContext, useContext } from "react"

interface User {
  id: string
  nom: string
  prenom: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

interface AuthContextProps {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: null, // Utiliser useSession de next-auth côté composant si besoin
        token: null,
        isAuthenticated: false,
        login: async () => { throw new Error('Utilisez NextAuth pour la connexion') },
        register: async () => { throw new Error('Utilisez l\'API /api/register pour l\'inscription') },
        logout: () => {},
        updateUser: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
