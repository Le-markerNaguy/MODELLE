import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET /api/users
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        profile: { select: { avatarUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    })
    // Concatène le nom pour l'UI
    const usersWithName = users.map(u => ({
      ...u,
      name: `${u.firstName} ${u.lastName}`.trim(),
      avatarUrl: u.profile?.avatarUrl || null,
    }))
    return NextResponse.json(usersWithName)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erreur lors du chargement des utilisateurs" }, { status: 500 })
  }
}
