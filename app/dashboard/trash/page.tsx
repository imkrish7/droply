"use client"
import FileTable from '@/components/FileTable'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { UploadedFile } from '@/schemas/file'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

const Page = () => {
    const { userId } = useAuth()
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            try {
                if (userId) {
                    const response = await fetch("/api/files/trash?" + new URLSearchParams({ "userId": userId, "trash": "true" }), {
                        method: "GET"
                    })
                    if (response.ok) {
                        const data = await response.json()
                        setFiles(data.files)
                    } else {
                        toast.error("Failed to fetch")
                    }
                }
            } catch (error) {
                console.log(error)
                toast.error("Failed to fetch")
            }
        })
    }, [userId])
    
    const filterFile = (id:string) => {
        setFiles([...files.filter(file=> file.id != id)])
    }
    
  return (
      <Card>
          <CardTitle className='font-bold text-2xl px-4'>Trash</CardTitle>
          <CardContent>
              <FileTable filterFile={filterFile} files={files} disableStarAction={true} />
          </CardContent>
    </Card>
  )
}


export default Page