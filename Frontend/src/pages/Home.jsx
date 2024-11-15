import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navigation/Navbar'
import ImageCarousel from '../components/home/ImageCarousel'
import DealCarousel from '../components/home/DealCarousel'
import Categories from '../components/home/Categories'

const Home = () => {
  return (
    <div className='bg-gray-100 mx-auto'>
      <Navbar />
      <DealCarousel />
      <Categories />
         
    </div>
  )
}

export default Home
