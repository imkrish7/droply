"use client"
import { Card, CardContent } from "./ui/card"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { UploadedFile } from "@/schemas/file"
import FileTable from "./FileTable"

interface IProps {
  updatedAt: string
}

export function UploadedFiles({updatedAt}: IProps) {
  const {userId} = useAuth()
  const [, startTransition] = useTransition()
  const [files, setFiles] = useState<UploadedFile[]>([])
  useEffect(() => {
    startTransition(async () => {
      try {
        if (userId) {
          const respone = await fetch("/api/files?" + new URLSearchParams({ userId: userId! }), {
            cache: 'no-store'
          })
          const data = await respone.json()
          setFiles(data.files)
        }
      } catch (error) {
        console.error(error)
        toast.error("Files fetching failed")
      }
    })
  }, [userId, updatedAt])
  
  const filterFile = (id:string) => {
        setFiles([...files.filter(file=> file.id != id)])
  }
  const updateFile = <K extends keyof UploadedFile>(id: string, field: K , value: UploadedFile[K]) => {
    const file: UploadedFile = files.filter(file => file.id === id)[0];
    file[field] = value
    setFiles([...files.filter(_file=> _file.id != id), file])
  }

  return (
    <Card>
      <CardContent>
        <FileTable updateFile={updateFile} filterFile={filterFile} files={files} />
      </CardContent>
    </Card>
  )
}
