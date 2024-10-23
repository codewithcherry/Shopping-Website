import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import ImageCarousel from '../components/home/ImageCarousel'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='w-full'>
      <ImageCarousel />
      </div>    
    </div>
  )
}

export default Home
