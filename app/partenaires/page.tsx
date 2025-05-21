import { redirect } from "next/navigation"

export default function PartenairesPage() {
  // Rediriger vers le tableau de bord des partenaires
  redirect("/partenaires/tableau-de-bord")
}
