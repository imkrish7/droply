"use client"
import { AppHeader } from '@/components/app-header'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { FC } from 'react'

interface IProps {
    children: React.ReactNode
}

const layout: FC<IProps> = ({children}) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <main className='grid w-full'>
                <div className='grid grid-rows-[50px_1fr] w-full'>
                    <div className='flex w-full'>
                        <AppHeader />
                    </div>
                    <section className='row-span-2'>
                        { children }
                    </section>
                </div> 
            </main>
        </SidebarProvider>
  )
}

export default layout