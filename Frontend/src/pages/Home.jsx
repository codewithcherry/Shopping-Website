import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navigation/Navbar'
import RecentlyViewedProducts from '../components/products/product/RecentlyViewedProducts';
import DealCarousel from '../components/home/DealCarousel'
import Categories from '../components/home/Categories'
import Footer from '../components/Footer/Footer'
import FlashSale from '../components/products/product/FlashSale'
import Promo1 from '../components/home/Promo1'
import BestSellingProducts from '../components/products/product/BestSellingProducts'
import ExploreProducts from '../components/home/ExploreProducts'
import NewArrival from '../components/home/NewArrival'
import Features from '../components/home/Features';


const Home = () => {
  return (
    <div className='bg-gray-100 mx-auto'>
      <Navbar />
      <DealCarousel />
      <Categories />
      <FlashSale />  
      <Promo1 />
      <BestSellingProducts />
      <NewArrival />
      <ExploreProducts />
      <RecentlyViewedProducts />
      <Features />
      <Footer /> 
    </div>
  )
}

export default Home
