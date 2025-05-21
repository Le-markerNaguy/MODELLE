import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      fullName,
      phone,
      ville,
      amount,
      moyenPaiement,
      message,
      receiptNeeded
    } = data;

    // Validation (basic)
    if (!fullName || !phone || !ville || !amount || !moyenPaiement) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 });
    }

    const donation = await prisma.donation.create({
      data: {
        fullName,
        phone,
        ville,
        amount: Number(amount),
        moyenPaiement,
        message: message || null,
        receiptNeeded: Boolean(receiptNeeded)
      }
    });

    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du don:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
