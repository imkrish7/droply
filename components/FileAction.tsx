"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Shredder, Star, Trash } from "lucide-react"
import { UploadedFile } from "@/schemas/file"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// type Checked = DropdownMenuCheckboxItemProps["checked"]
interface IProps {
  file: UploadedFile,
  disableStarAction?: boolean
}

export function FileAction({ file, disableStarAction }: IProps) {
  console.log(disableStarAction)
  const router = useRouter()
  const [stared, setStared] = React.useState(false);
  const [trashed, setTrashed] = React.useState(false);
  
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
          setStared(!file.isStared);
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
          toast.success(`File ${file.name} moved to trash`)
          setTrashed(!file.isTrash);
        }
        
      } catch (error) {
        console.error(error)
          toast.error("Something went wrong")
      }
    })
  }

  return (
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
                      <span className={`${file.isStared || stared ? "text-blue-500" : "text-gray-500"} font-medium`}>Star</span>
            </Button>}
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Button disabled={isTrashedPending} onClick={handleTrash} variant="outline">
                      <Trash className={`w-10 h-10 ${file.isTrash ? "text-blue-700": "text-gray-700"}`} />
                      <span className={`${file.isTrash || trashed? "text-blue-500": "text-gray-500"} font-medium`}>Move in trash</span>
            </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Button variant="outline">
                      <Shredder className="w-10 h-10" />
                      <span className="text-gray-500 font-medium">Delete</span>
            </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
