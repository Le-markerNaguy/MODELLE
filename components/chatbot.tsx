"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ChatbotEvaluation } from "@/components/chatbot-evaluation"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Utiliser le hook useChat de Vercel AI SDK
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Bonjour ! Je suis l'assistante virtuelle de Mod'Elles. Comment puis-je vous aider aujourd'hui ?",
      },
    ],
  })

  const handleEvaluate = (messageId: string, rating: number, feedback?: string) => {
    console.log(`Message ${messageId} rated ${rating}/5`, feedback ? `Feedback: ${feedback}` : "")
    // Dans une implémentation réelle, vous enverriez ces données à votre backend
  }

  // Effet pour suggérer une interaction après une période d'inactivité
  useEffect(() => {
    const inactivityTimer = setTimeout(() => {
      if (isOpen && !isMinimized && messages.length < 3 && !isLoading) {
        append({
          role: "assistant",
          content:
            "Vous pouvez me poser des questions sur la santé reproductive, le soutien psychologique, ou les services de Mod'Elles. Comment puis-je vous aider aujourd'hui ?",
        })
      }
    }, 30000) // 30 secondes d'inactivité

    return () => clearTimeout(inactivityTimer)
  }, [lastInteraction, isOpen, isMinimized, messages.length, isLoading, append])

  // Effet pour faire défiler vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Gestionnaire d'envoi de message personnalisé
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
      setLastInteraction(Date.now())
    }
  }

  return (
    <>
      {/* Bouton flottant pour ouvrir le chat */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 bg-pink-600 hover:bg-pink-700 shadow-lg flex items-center justify-center z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <Card
          className={cn(
            "fixed right-6 shadow-lg transition-all duration-300 w-80 md:w-96 z-50",
            isMinimized ? "bottom-6 h-14" : "bottom-6 h-[500px] max-h-[80vh]",
          )}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Assistante Mod'Elles</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-0 overflow-y-auto h-[calc(100%-110px)]">
                <div className="flex flex-col p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.role === "assistant"
                            ? "bg-muted self-start rounded-tl-none"
                            : "bg-pink-600 text-white self-end rounded-br-none",
                        )}
                      >
                        {message.content}
                      </div>
                      {message.role === "assistant" && messages.indexOf(message) > 0 && (
                        <ChatbotEvaluation messageId={message.id} onEvaluate={handleEvaluate} />
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted self-start rounded-tl-none flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>En train d'écrire...</span>
                    </div>
                  )}
                  {error && (
                    <div className="max-w-[80%] rounded-lg p-3 bg-red-100 text-red-600 self-start">
                      Désolé, une erreur s'est produite. Veuillez réessayer.
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Tapez votre message..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-pink-600 hover:bg-pink-700"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}
