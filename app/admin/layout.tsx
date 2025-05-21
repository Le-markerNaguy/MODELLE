import type React from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Dans une application réelle, vous vérifieriez ici si l'utilisateur est authentifié et a les droits d'administrateur
  // Si ce n'est pas le cas, vous le redirigeriez vers la page de connexion
  // Pour cette démonstration, nous supposons que l'utilisateur est authentifié et a les droits d'administrateur

  // Exemple de vérification (commenté pour la démonstration)
  // const isAuthenticated = false
  // const isAdmin = false
  // if (!isAuthenticated) {
  //   redirect('/connexion')
  // }
  // if (!isAdmin) {
  //   redirect('/')
  // }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/admin/test-chatbot" className="block px-4 py-2 hover:bg-gray-100">
              Test du Chatbot
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  )
}
