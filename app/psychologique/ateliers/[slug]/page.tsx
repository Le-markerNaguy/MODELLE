"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Clock, User, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AtelierInscriptionPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    experience: "debutant",
    acceptTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dans une application réelle, vous récupéreriez les données de l'atelier à partir d'une API ou d'une base de données
  // Ici, nous utilisons des données statiques pour la démonstration
  const workshop = {
    title: "Gestion du stress et relaxation",
    description:
      "Cet atelier pratique vous apprendra des techniques efficaces pour gérer le stress quotidien et favoriser la relaxation. Vous découvrirez des exercices de respiration, de méditation et de relaxation musculaire progressive que vous pourrez facilement intégrer dans votre vie quotidienne.",
    date: "18 avril 2024",
    time: "14h00 - 17h00",
    location: "Centre Mod'Elles, Libreville",
    facilitator: "Dr. Claire Mba",
    price: "Gratuit",
    maxParticipants: 15,
    currentParticipants: 8,
    requirements: ["Tenue confortable", "Tapis de yoga (si possible)", "Bouteille d'eau"],
    benefits: [
      "Techniques de respiration pour calmer l'anxiété",
      "Méthodes de relaxation musculaire progressive",
      "Pratiques de pleine conscience pour le quotidien",
      "Stratégies pour identifier et gérer les déclencheurs de stress",
    ],
    imageUrl: "/placeholder.svg?height=300&width=600",
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, experience: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      toast({
        title: "Inscription confirmée !",
        description: `Votre place pour l'atelier "${workshop.title}" a été réservée.`,
      })
      setIsSubmitting(false)
      // Dans une application réelle, vous redirigeriez vers une page de confirmation
    }, 1500)
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground mr-2">
          Soutien Psychologique
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <Link href="/psychologique" className="text-muted-foreground hover:text-foreground mr-2">
          Ateliers de Bien-être
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <span>{workshop.title}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="relative h-[200px] rounded-lg overflow-hidden mb-6">
            <Image src={workshop.imageUrl || "/placeholder.svg"} fill alt={workshop.title} className="object-cover" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{workshop.title}</CardTitle>
              <CardDescription>Atelier de bien-être</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{workshop.description}</p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{workshop.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{workshop.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{workshop.location}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Animé par {workshop.facilitator}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {workshop.currentParticipants}/{workshop.maxParticipants} participants
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-medium mb-2">Ce que vous apprendrez :</h3>
                <ul className="space-y-1 list-disc pl-5 text-sm text-muted-foreground">
                  {workshop.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>\
