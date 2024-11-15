import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navigation/Navbar'
import ImageCarousel from '../components/home/ImageCarousel'
import DealCarousel from '../components/home/DealCarousel'

const Home = () => {
  return (
    <div>
      <Navbar />
      <DealCarousel />
         
    </div>
  )
}

export default Home
