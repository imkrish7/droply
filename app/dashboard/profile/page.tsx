"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
    const { user } = useUser();
    console.log(user)
    return (
        <div className='flex h-full w-full justify-center items-center'>
            <Card className='w-[400px] h-[500px]'>
                <CardContent className='flex flex-col h-full'>
                    <div className='flex justify-center'>
                        <Avatar className='h-40 w-40'>
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                    </div>
                    <div className='space-y-2 border-b h-2' />
                    <div className='flex flex-col flex-grow justify-center'>
                        <div className='flex justify-between'>
                            <span className='text-gray-450 font-medium'>Name</span>
                            <span className='text-gray-450 font-medium'>{user?.fullName }</span>
                        </div>
                        <div className='h-4 border-b' />
                        <div className='flex justify-between '>
                            <span>Email</span>
                            <span>{user?.emailAddresses ? user?.emailAddresses![0].emailAddress : "Not Available" }</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page