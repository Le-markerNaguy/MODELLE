import OpenAI from "openai"
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions"
import fs from 'fs'
import path from 'path'

// Créer une instance OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Contexte initial pour le chatbot
const systemPromptPath = path.join(process.cwd(), 'lib', 'estelle_system_prompt.txt')
export const SYSTEM_PROMPT = fs.readFileSync(systemPromptPath, 'utf8')

export async function generateChatResponse(messages: { role: string; content: string }[]) {
  try {
    // Ajouter le message système au début de la conversation
    const conversationWithSystemPrompt: ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages as ChatCompletionMessageParam[]
    ];

    // Appeler l'API OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationWithSystemPrompt,
      temperature: 0.7,
      max_tokens: 500,
    });

    // Retourner le texte de la réponse
    return response.choices[0]?.message?.content || "Je n'ai pas pu générer de réponse pour le moment.";
  } catch (error) {
    console.error("Erreur lors de la génération de la réponse:", error);
    throw new Error("Impossible de générer une réponse. Veuillez réessayer plus tard.");
  }
}
