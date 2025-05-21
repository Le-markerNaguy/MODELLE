import { generateChatResponse } from "@/lib/openai"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Vérifier que les messages sont au bon format
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Format de messages invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Générer la réponse
    const response = await generateChatResponse(messages)
    return response
  } catch (error) {
    console.error("Erreur dans la route API chat:", error)
    return new Response(JSON.stringify({ error: "Erreur du serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
