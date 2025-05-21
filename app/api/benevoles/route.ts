import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const volunteer = await prisma.volunteer.create({
      data: {
        firstName: data.firstName || null,
        lastName: data.lastName,
        email: data.email || null,
        phone: data.phone || null,
        city: data.city || null,
        country: data.country || null,
        domain: data.domain || null,
        skills: data.skills || null,
        experience: data.experience || null,
        motivation: data.motivation,
        availability: data.availability ? JSON.stringify(data.availability) : null,
        cvUrl: data.cvUrl || null, // à gérer si upload
      },
    });
    return NextResponse.json({ success: true, volunteer });
  } catch (error) {
    console.error("Volunteer API error:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }
}
