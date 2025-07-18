import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <Image className='h-full w-full' src={"/hero.svg"} alt="hero image" width={100} height={100}/>
  )
}

export default Hero