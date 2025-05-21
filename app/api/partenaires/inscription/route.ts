import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Vérifier si l'email existe déjà
    const existing = await prisma.partner.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Cet email est déjà utilisé." }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const partner = await prisma.partner.create({
      data: {
        organisationName: data.organisationName,
        contactName: data.contactName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        country: data.country || "Gabon",
        organisationType: data.organisationType || null,
        description: data.description || null,
        website: data.website || null,
        partnershipType: data.partnershipType ? JSON.stringify(data.partnershipType) : null,
        acceptTerms: !!data.acceptTerms,
      },
    });
    return NextResponse.json({ success: true, partner });
  } catch (error) {
    console.error("Partner registration error:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de l'inscription." }, { status: 500 });
  }
}
