import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"
import { promises as fsPromises } from "fs"

// Directory where files will be stored (in /public/uploads)
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

export async function POST(req: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 })
    }

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    // Generate a unique filename
    const ext = file.name.split(".").pop() || ""
    const base = file.name.replace(/\.[^/.]+$/, "")
    const timestamp = Date.now()
    const filename = `${base}-${timestamp}.${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Write file to disk
    await fs.writeFile(filepath, buffer)

    // Return the public URL
    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erreur lors de l'upload" }, { status: 500 })
  }
}
