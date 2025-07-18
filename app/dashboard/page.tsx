import { UploadedFiles } from '@/components/UploadedFiles'
import Uploader from '@/components/Uploader'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex flex-col px-2 gap-10'>
      <section className='h-50'>
        <Uploader />
      </section>
      <section className='flex-grow'>
        <UploadedFiles />
      </section>
    </div>
  )
}

export default Dashboard