import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Trash } from "lucide-react"
import Link from "next/link"
 
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-3xl font-bold">Droply</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className="w-4 h-4" />
                  <Link href="/dashboard">Home</Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <Trash className="w-4 h-4" />
                  <Link href="/dashboard/trash">Trash</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}