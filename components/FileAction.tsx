"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArchiveRestore, EllipsisVertical, Shredder, Star, Trash } from "lucide-react"
import { UploadedFile } from "@/schemas/file"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { DeleteBanner } from "./DeleteBanner"

// type Checked = DropdownMenuCheckboxItemProps["checked"]
interface IProps {
  file: UploadedFile,
  disableStarAction?: boolean,
  filterFile: (id: string) => void,
  updateFile?: <K extends keyof UploadedFile>(id: string, field: K, value: UploadedFile[K]) => void
}

export function FileAction({ file, disableStarAction, filterFile, updateFile }: IProps) {
  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const router = useRouter()
  
  const [isStaredPending, startStaredTransition] = React.useTransition()
  const [isTrashedPending, startTrashedTransition] = React.useTransition()

  const handleStared = () => {
    startStaredTransition(async () => {
      try {

        const response = await fetch(`/api/files/${file.id}/star`, {
          method: "PATCH"
        })

        if (response.ok) {
          toast.success(`File ${file.name} marked stared`)
          updateFile!(file.id, "isStared", !file.isStared)
          router.refresh()
        }
        
      } catch (error) {
        console.error(error)
          toast.error("Something went wrong")
      }
    })
  }

   const handleTrash = () => {
    startTrashedTransition(async () => {
      try {

        const response = await fetch(`/api/files/${file.id}/trash`, {
          method: "PATCH"
        })

        if (response.ok) {
          toast.success(`File ${file.name} ${disableStarAction ? "is restored" : "moved to trash"}`)
          filterFile(file.id)
          
        }
        
      } catch (error) {
        console.error(error)
          toast.error("Something went wrong")
      }
    })
  }

  const handleDelete = () => {
      startTrashedTransition(async () => {
      try {

        const response = await fetch(`/api/files/${file.id}/delete`, {
          method: "Delete"
        })

        if (response.ok) {
          toast.success(`File ${file.name} deleted permanently`)
          filterFile(file.id)
        }
        
      } catch (error) {
          console.error(error)
          toast.error("Something went wrong")
      } finally {
        setDeleteOpen(false)
      }
    })
  }

  return (
    <>
    {deleteOpen && <DeleteBanner handleDelete={handleDelete} open={deleteOpen} setOpen={setDeleteOpen} />}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
            <EllipsisVertical className="w-10 h-10" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
            {!disableStarAction && <Button onClick={handleStared} disabled={isStaredPending} variant="outline">
                      <Star className={`w-10 h-10 ${file.isStared ? "text-blue-700": "text-gray-700"}`} />
                      <span className={`${file.isStared? "text-blue-500" : "text-gray-500"} font-medium`}>Star</span>
            </Button>}
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Button disabled={isTrashedPending} onClick={handleTrash} variant="outline">
                      {disableStarAction ? <ArchiveRestore className="w-10 h-10" /> :<Trash className={`w-10 h-10 ${file.isTrash ? "text-blue-700": "text-gray-700"}`} />}
                      <span className={`text-gray-500 font-medium`}>{disableStarAction ?"Restore" :"Move in trash"}</span>
            </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Button onClick={()=> setDeleteOpen(true)} variant="outline">
                      <Shredder className="w-10 h-10" />
                      <span className="text-gray-500 font-medium">Delete</span>
            </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
      </>
  )
}
