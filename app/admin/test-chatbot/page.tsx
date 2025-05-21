"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "ai/react"
import { Loader2 } from "lucide-react"

// Scénarios de test prédéfinis
const TEST_SCENARIOS = {
  santeReproductive: [
    "Comment fonctionne l'outil de suivi de cycle menstruel ?",
    "Quelles méthodes contraceptives sont disponibles au Gabon ?",
    "Mes règles sont très douloureuses, que puis-je faire ?",
    "Comment savoir si je suis enceinte ?",
    "Quels sont les symptômes d'une infection sexuellement transmissible ?",
  ],
  soutienPsychologique: [
    "Comment prendre rendez-vous avec un psychologue ?",
    "Je me sens déprimée depuis plusieurs semaines, que faire ?",
    "Quels groupes de soutien proposez-vous ?",
    "Comment gérer mon anxiété au quotidien ?",
    "Je souhaite participer à un atelier sur l'estime de soi, comment faire ?",
  ],
  urgence: [
    "Je suis en danger, mon partenaire me menace",
    "J'ai été agressée, que dois-je faire ?",
    "Je pense au suicide, j'ai besoin d'aide",
    "Mon amie est victime de violence, comment l'aider ?",
    "J'ai besoin d'un refuge immédiatement",
  ],
  ressourcesEducatives: [
    "Qu'est-ce qu'une relation saine ?",
    "Comment expliquer le consentement ?",
    "Comment améliorer mon estime de soi ?",
    "Quels produits d'hygiène menstruelle sont recommandés ?",
    "Pourquoi choisir l'abstinence ?",
  ],
  precariteMenstruelle: [
    "Comment accéder à des produits d'hygiène menstruelle gratuits ?",
    "Comment fabriquer des serviettes réutilisables ?",
    "Quelles actions sont menées contre la précarité menstruelle au Gabon ?",
    "Comment participer à vos programmes de distribution ?",
    "Comment sensibiliser sur la précarité menstruelle dans mon école ?",
  ],
  divers: [
    "Comment faire un don à Mod'Elles ?",
    "Quels sont vos horaires d'ouverture ?",
    "Comment devenir bénévole ?",
    "Où se trouvent vos locaux à Libreville ?",
    "Comment contacter l'équipe de Mod'Elles ?",
  ],
}

export default function TestChatbot() {
  const [selectedScenario, setSelectedScenario] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [testHistory, setTestHistory] = useState<Array<{ prompt: string; response: string; time: number }>>([])
  const [activeTab, setActiveTab] = useState("santeReproductive")

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      // Ajouter la réponse à l'historique des tests
      setTestHistory((prev) => [
        ...prev,
        {
          prompt: selectedScenario || customPrompt,
          response: message.content,
          time: Date.now(),
        },
      ])
      setSelectedScenario("")
      setCustomPrompt("")
    },
  })

  const handleScenarioSelect = (scenario: string) => {
    setSelectedScenario(scenario)
    handleInputChange({ target: { value: scenario } } as React.ChangeEvent<HTMLTextAreaElement>)
  }

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(e.target.value)
    handleInputChange(e)
  }

  const runTest = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(e)
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Test du Chatbot</h1>
      <p className="text-gray-600 mb-8">
        Cette page vous permet de tester le chatbot avec différents scénarios pour vérifier son bon fonctionnement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Scénarios de test</CardTitle>
            <CardDescription>Sélectionnez un scénario prédéfini ou créez votre propre prompt</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="santeReproductive">Santé</TabsTrigger>
                <TabsTrigger value="soutienPsychologique">Psychologie</TabsTrigger>
                <TabsTrigger value="urgence">Urgence</TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="ressourcesEducatives">Ressources</TabsTrigger>
                <TabsTrigger value="precariteMenstruelle">Précarité</TabsTrigger>
                <TabsTrigger value="divers">Divers</TabsTrigger>
              </TabsList>

              {Object.entries(TEST_SCENARIOS).map(([key, scenarios]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="space-y-2">
                    {scenarios.map((scenario, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start h-auto py-2 px-4 text-left"
                        onClick={() => handleScenarioSelect(scenario)}
                      >
                        {scenario}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6">
              <form onSubmit={runTest}>
                <Textarea
                  placeholder="Ou entrez votre propre prompt ici..."
                  className="min-h-[100px]"
                  value={input}
                  onChange={handleCustomPromptChange}
                />
                <Button type="submit" className="mt-4 w-full" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Test en cours...
                    </>
                  ) : (
                    "Tester le chatbot"
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Résultats des tests</CardTitle>
            <CardDescription>Réponses du chatbot aux scénarios testés</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            {testHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun test effectué. Sélectionnez un scénario et cliquez sur "Tester le chatbot".
              </div>
            ) : (
              <div className="space-y-6">
                {testHistory.map((test, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-pink-600">{formatTime(test.time)}</div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded mb-3">
                      <p className="font-medium">Prompt:</p>
                      <p>{test.prompt}</p>
                    </div>
                    <div>
                      <p className="font-medium">Réponse:</p>
                      <p className="whitespace-pre-wrap">{test.response}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => setTestHistory([])}
              disabled={testHistory.length === 0}
              className="w-full"
            >
              Effacer l'historique
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
