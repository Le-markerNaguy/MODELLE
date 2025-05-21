"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type EvaluationProps = {
  messageId: string
  onEvaluate: (messageId: string, rating: number, feedback?: string) => void
}

export function ChatbotEvaluation({ messageId, onEvaluate }: EvaluationProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleRating = (value: number) => {
    setRating(value)
    if (value <= 3) {
      setShowFeedback(true)
    } else {
      onEvaluate(messageId, value)
      setSubmitted(true)
    }
  }

  const handleSubmitFeedback = () => {
    if (rating) {
      onEvaluate(messageId, rating, feedback)
      setSubmitted(true)
      setShowFeedback(false)
    }
  }

  if (submitted) {
    return <div className="text-xs text-gray-500 mt-1">Merci pour votre évaluation !</div>
  }

  return (
    <div className="mt-1">
      {!showFeedback ? (
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500 mr-1">Cette réponse était-elle utile ?</span>
          {[1, 2, 3, 4, 5].map((value) => (
            <Button key={value} variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRating(value)}>
              <StarIcon
                className={cn(
                  "h-4 w-4",
                  rating && value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                )}
              />
            </Button>
          ))}
        </div>
      ) : (
        <Card className="mt-2">
          <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm">Comment pouvons-nous améliorer cette réponse ?</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3">
            <textarea
              className="w-full p-2 text-sm border rounded-md"
              rows={2}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Votre feedback nous aide à améliorer notre assistant..."
            />
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => setShowFeedback(false)}>
                Annuler
              </Button>
              <Button size="sm" onClick={handleSubmitFeedback} disabled={!feedback.trim()}>
                Envoyer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
