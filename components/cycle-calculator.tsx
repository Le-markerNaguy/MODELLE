"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Info } from "lucide-react"
// Remplacer les imports de date-fns qui pourraient causer des problèmes
import { addDays, differenceInDays } from "date-fns"
// Simplifier l'import de locale pour éviter des problèmes
import { fr } from "date-fns/locale"

// Ajouter une fonction de formatage simplifiée pour éviter les problèmes avec date-fns
function formatDate(date: Date, format = "dd/MM/yyyy") {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ]

  return format
    .replace("dd", day)
    .replace("MM", month)
    .replace("MMMM", monthNames[date.getMonth()])
    .replace("yyyy", year.toString())
}

export function CycleCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(undefined)
  const [cycleLength, setCycleLength] = useState<number>(28)
  const [periodLength, setPeriodLength] = useState<number>(5)
  const [showResults, setShowResults] = useState<boolean>(false)

  const handleCalculate = () => {
    if (lastPeriodDate) {
      setShowResults(true)
    }
  }

  const calculateNextPeriod = () => {
    if (!lastPeriodDate) return null
    return addDays(lastPeriodDate, cycleLength)
  }

  const calculateFertileWindow = () => {
    if (!lastPeriodDate) return { start: null, end: null }

    // Fertile window typically starts 5 days before ovulation and ends on the day of ovulation
    // Ovulation typically occurs 14 days before the next period
    const nextPeriod = calculateNextPeriod()
    if (!nextPeriod) return { start: null, end: null }

    const ovulationDate = addDays(nextPeriod, -14)
    const fertileStart = addDays(ovulationDate, -5)
    const fertileEnd = ovulationDate

    return { start: fertileStart, end: fertileEnd }
  }

  const calculateDaysUntilNextPeriod = () => {
    if (!lastPeriodDate) return null
    const nextPeriod = calculateNextPeriod()
    if (!nextPeriod) return null

    const today = new Date()
    return differenceInDays(nextPeriod, today)
  }

  const nextPeriod = calculateNextPeriod()
  const fertileWindow = calculateFertileWindow()
  const daysUntilNextPeriod = calculateDaysUntilNextPeriod()

  return (
    <Card className="relative overflow-visible">
      <CardHeader>
        <CardTitle>Calculateur de Cycle Menstruel</CardTitle>
        <CardDescription>Suivez votre cycle et prévoyez vos prochaines règles</CardDescription>
        <div className="absolute -right-3 -top-3 transform rotate-12 bg-pink-500 text-white px-3 py-1 rounded-lg shadow-lg animate-pulse font-medium text-sm">
          Utilise-moi !
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="last-period">Date de vos dernières règles</Label>
              <div className="border rounded-md p-2">
                <Calendar
                  mode="single"
                  selected={lastPeriodDate}
                  onSelect={setLastPeriodDate}
                  disabled={(date) => date > new Date()}
                  locale={fr}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cycle-length">Durée de votre cycle (jours)</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCycleLength(Math.max(21, cycleLength - 1))}
                  disabled={cycleLength <= 21}
                >
                  -
                </Button>
                <Input
                  id="cycle-length"
                  type="number"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number.parseInt(e.target.value) || 28)}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCycleLength(Math.min(35, cycleLength + 1))}
                  disabled={cycleLength >= 35}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">La durée moyenne d&apos;un cycle est de 28 jours</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period-length">Durée de vos règles (jours)</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPeriodLength(Math.max(2, periodLength - 1))}
                  disabled={periodLength <= 2}
                >
                  -
                </Button>
                <Input
                  id="period-length"
                  type="number"
                  min="2"
                  max="10"
                  value={periodLength}
                  onChange={(e) => setPeriodLength(Number.parseInt(e.target.value) || 5)}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPeriodLength(Math.min(10, periodLength + 1))}
                  disabled={periodLength >= 10}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">La durée moyenne des règles est de 3 à 7 jours</p>
            </div>

            <Button
              className="w-full bg-pink-600 hover:bg-pink-700"
              onClick={handleCalculate}
              disabled={!lastPeriodDate}
            >
              Calculer
            </Button>
          </div>

          {showResults && lastPeriodDate && (
            <div className="space-y-4">
              <div className="bg-pink-50 dark:bg-pink-900/10 p-4 rounded-lg">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <CalendarDays className="h-5 w-5 text-pink-600" />
                  Résultats
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Prochaines règles:</p>
                    <p className="text-muted-foreground">
                      {nextPeriod ? formatDate(nextPeriod, "dd MMMM yyyy") : "Non calculé"}
                    </p>
                    {daysUntilNextPeriod !== null && (
                      <p className="text-xs mt-1">
                        {daysUntilNextPeriod <= 0
                          ? "Vos règles devraient commencer aujourd'hui!"
                          : `Dans ${daysUntilNextPeriod} jour${daysUntilNextPeriod > 1 ? "s" : ""}`}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-medium">Période fertile:</p>
                    <p className="text-muted-foreground">
                      {fertileWindow.start && fertileWindow.end
                        ? `Du ${formatDate(fertileWindow.start, "dd MMMM")} au ${formatDate(fertileWindow.end, "dd MMMM yyyy")}`
                        : "Non calculé"}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Durée du cycle:</p>
                    <p className="text-muted-foreground">{cycleLength} jours</p>
                  </div>

                  <div>
                    <p className="font-medium">Durée des règles:</p>
                    <p className="text-muted-foreground">{periodLength} jours</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 dark:text-blue-300">Important</p>
                  <p className="text-muted-foreground">
                    Ce calculateur fournit des estimations basées sur un cycle régulier. Les cycles menstruels peuvent
                    varier en fonction de nombreux facteurs. Consultez un professionnel de santé pour un suivi
                    personnalisé.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
