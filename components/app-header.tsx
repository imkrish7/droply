"use client"

import * as React from "react"
import { Input } from "./ui/input"
import { DropdownMenuCheckboxes } from "./app-header-dropdown"


export function AppHeader() {
  return (
      <div className="flex w-full py-2 items-center gap-4 px-2">
        <div className="flex flex-grow">
          <Input placeholder="search your files...."/>
      </div>
      <DropdownMenuCheckboxes />
      </div>
  )
}
