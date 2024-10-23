import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import ImageCarousel from '../components/home/ImageCarousel'

const Home = () => {
  return (
    <div>
      <Navbar />
      
      <ImageCarousel />
         
    </div>
  )
}

export default Home
