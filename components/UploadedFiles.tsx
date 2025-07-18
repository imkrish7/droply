"use client"

import { Card, CardContent } from "./ui/card"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { UploadedFile } from "@/schemas/file"
import FileTable from "./FileTable"


export function UploadedFiles() {
  const {userId} = useAuth()
  const [, startTransition] = useTransition()
  const [files, setFiles] = useState<UploadedFile[]>([])
  useEffect(() => {
    startTransition(async () => {
      try {
        if (userId) {
          const respone = await fetch("/api/files?" + new URLSearchParams({ userId: userId! }))
          const data = await respone.json()
          setFiles(data.files)
        }
      } catch (error) {
        console.error(error)
        toast.error("Files fetching failed")
      }
      
    })
  }, [userId])
 
  return (
    <Card>
      <CardContent>
        <FileTable files={files} />
      </CardContent>
    </Card>
  )
}
