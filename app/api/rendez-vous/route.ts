import { NextResponse } from "next/server"

// Cette route n'est plus utilisée. Les rendez-vous sont maintenant gérés via /api/appointments.
export async function POST() {
  return NextResponse.json({ error: "Utilisez /api/appointments pour prendre rendez-vous." }, { status: 410 })
}
