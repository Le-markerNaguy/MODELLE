"use client"

import { useState, useRef } from "react"
import { Send, X, MessageSquareText, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function ChatbotEstelle() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour, je suis Estelle, votre assistante virtuelle. Comment puis-je vous aider ?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat/estelle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Désolée, une erreur est survenue." }])
    } finally {
      setLoading(false)
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 shadow-lg bg-pink-600 hover:bg-pink-700"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquareText className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white border rounded-lg shadow-lg flex flex-col h-[500px]">
          <div className="bg-pink-600 text-white px-4 py-2 rounded-t-lg font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/estelle-doctor.png" alt="Estelle Avatar" />
              </Avatar>
              <span>Estelle</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm flex items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <Avatar className="h-8 w-8 mr-2 bg-white flex-shrink-0">
                    <AvatarImage src="/avatars/estelle-doctor.png" alt="Estelle Avatar" />
                  </Avatar>
                )}
                <span className={msg.role === "user" ? "inline-block bg-pink-100 text-pink-800 rounded-lg px-3 py-2" : "inline-block bg-white border rounded-lg px-3 py-2"}>
                  {msg.content}
                </span>
                {msg.role === "user" && (
                  <Avatar className="h-8 w-8 ml-2 bg-gray-200 flex-shrink-0">
                    <AvatarImage src="/avatars/user-avatar.png" alt="User Avatar" />
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 p-2 border-t bg-white">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Écrivez à Estelle..."
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !input.trim()} className="bg-pink-600 hover:bg-pink-700">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
