import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { SYSTEM_PROMPT } from "@/lib/openai"

// Configuration de l'API Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Cache simple pour éviter les requêtes répétitives
const messageCache = new Map()

export async function POST(req: NextRequest) {
  // Vérification de la clé API
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY manquante")
    return NextResponse.json(
      { error: "Configuration serveur incomplète" },
      { status: 500 }
    )
  }

  try {
    const { messages } = await req.json()
    
    // Validation des messages
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Format de message invalide" },
        { status: 400 }
      )
    }

    // Création d'un identifiant unique pour le cache
    const cacheKey = JSON.stringify(messages.slice(-10))
    
    // Vérification du cache
    if (messageCache.has(cacheKey)) {
      return NextResponse.json({ reply: messageCache.get(cacheKey) })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Convertir les messages au format attendu par Gemini
    const history = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Ok, je suis prête à aider." }] }, 
      ...messages.slice(-10).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))
    ]

    const chat = model.startChat({
      history: history,
      generationConfig: { maxOutputTokens: 400 },
    })

    const result = await chat.sendMessage(messages[messages.length - 1].content)
    const response = await result.response
    const reply = response.text()
    
    // Mise en cache
    messageCache.set(cacheKey, reply)
    
    return NextResponse.json({ reply })

  } catch (err: any) {
    console.error("Erreur API:", err)
    
    // Gestion des erreurs
    return NextResponse.json(
      { 
        error: "Erreur de communication avec le service",
        details: err.message 
      },
      { status: err.status || 500 }
    )
  }
}