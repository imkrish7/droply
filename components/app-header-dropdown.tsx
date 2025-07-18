"use client"

import * as React from "react"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuth, useUser } from "@clerk/nextjs"
import { LucideLogOut } from "lucide-react"
import Link from "next/link"


export function DropdownMenuCheckboxes() {
  const { signOut } = useAuth()

  const { user } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 px-4 py-4">
        <DropdownMenuItem>
          <Link href={"/dashboard/profile"}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div onClick={async()=>{ await signOut()}} className="flex justify-between cursor-pointer">
            <span className="text-gray-500">Sign out</span>
            <LucideLogOut className="w-6 h-6 text-gray-500" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
