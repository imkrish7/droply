"use client"
import React, { ChangeEvent, useRef, useTransition } from 'react'
import { Card, CardContent } from './ui/card'
import { FolderUp } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const Uploader= () => {
    const { userId } = useAuth();
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (userId && event.target.files) {
            const formData = new FormData()
            formData.set("file", event.target.files[0])
            formData.set("userId", userId)
            console.log(event)
            startTransition(async () => {
                try {
                     const response = await fetch("/api/files/upload", {
                        method: "POST",
                         body: formData,
                        cache: 'no-store'
                     })
                    
                    if (response.ok) {
                        toast.success("File uploaded successfully!")
                        if (inputRef.current) {
                            inputRef.current.value = ""
                        }
                        
                    } else {
                        toast.error("Failed to upload file!")
                    }
                    
                } catch (error) {
                    console.log(error)
                    toast.error("Upload Failed!")
                } finally {
                    router.refresh()
                }
               
            })
        }
    }
  return (
      <Card className='relative flex w-full h-full shadow-xl/10 cursor-pointer'>
          <CardContent>
              <div className='flex flex-col justify-center items-center gap-4'>
                  <FolderUp className='h-10 w-10' />
                  <div className='flex flex-col'>
                      <span className='flex text-md gap-2'>
                          <p className='text-blue-500 font-medium'>Click here</p>
                          <p> to upload your file or drag</p>
                      </span>
                      <span className='text-gray-500'>
                          Supported Format: PDF, JPG, PNG
                      </span>
                  </div>
              </div>
              
          </CardContent>
          <input ref={inputRef} disabled={isPending} onChange={handleClick} className='absolute h-full w-full opacity-0' type="file" />
    </Card>
  )
}

export default Uploader