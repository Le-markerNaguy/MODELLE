"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Download, Play, Pause, Volume2, VolumeX } from "lucide-react"

interface Document {
  title: string
  description: string
  filename: string
  path: string
}

interface Video {
  title: string
  description: string
  thumbnail: string
  path: string
}

interface ResourceMediaProps {
  documents: Document[]
  videos: Video[]
}

export default function ResourceMedia({ documents, videos }: ResourceMediaProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const handleVideoPlay = (videoPath: string) => {
    setActiveVideo(videoPath)
    setIsPlaying(true)

    // Get the video element and play it
    const videoElement = document.getElementById("active-video") as HTMLVideoElement
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }
  }

  const togglePlay = () => {
    const videoElement = document.getElementById("active-video") as HTMLVideoElement
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause()
      } else {
        videoElement.play().catch((error) => {
          console.error("Error playing video:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const videoElement = document.getElementById("active-video") as HTMLVideoElement
    if (videoElement) {
      videoElement.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <Tabs defaultValue="videos" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="videos">Vidéos</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

      <TabsContent value="videos" className="space-y-4">
        {activeVideo ? (
          <div className="relative rounded-lg overflow-hidden bg-black">
            <video
              id="active-video"
              src={activeVideo}
              className="w-full aspect-video"
              poster={videos.find((v) => v.path === activeVideo)?.thumbnail}
              controls={false}
              muted={isMuted}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
              <div className="text-white text-sm">{videos.find((v) => v.path === activeVideo)?.title}</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative cursor-pointer group" onClick={() => handleVideoPlay(video.path)}>
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="rounded-full bg-white/80 p-3">
                      <Play className="h-8 w-8 text-rose-600" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 dark:bg-rose-900/30 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                    <a
                      href={doc.path}
                      download={doc.filename}
                      className="inline-flex items-center mt-3 text-sm font-medium text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
