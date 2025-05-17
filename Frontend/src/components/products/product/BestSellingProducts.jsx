import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../Alert/Loading'; // Assuming you have a Loading component
import ProductCard from '../ProductCard'; // Assuming you have a ProductCard component
import { ChevronLeftIcon, ChevronRightIcon,ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const BestSellingProducts = () => {

    const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const productsToShow = 4; // Number of products visible at a time
  const cardWidthPercentage = 100 / productsToShow; // Percentage width of a single card

  const navigate=useNavigate();

  const now = new Date();
  const targetDate = new Date();
  targetDate.setDate(now.getDate() + 3); // Countdown to 3 days from now

  const fetchBestSellingProducts=async () => {
    setLoading(true)
    try {
      const response=await axios.get('https://16.171.36.90:3000/products/get-best-selling-products');
      setProducts(response.data.products)
    } catch (error) {
      console.log('error fetching flash sale products',error)
    }
    finally{
      setLoading(false)
    }
  }

  const handleViewMore=()=>{
    navigate('/products?bestSelling=true')
  }

  useEffect(()=>{
      fetchBestSellingProducts();
  },[])
    

  const handleNextProduct = () => {
    if (productIndex < products.length - 1) {
      setProductIndex((prevIndex) => prevIndex + 1);
      setTranslateX((prev) => prev - cardWidthPercentage); // Move one card left
    }
  };

  const handlePrevProduct = () => {
    if (productIndex > 0) {
      setProductIndex((prevIndex) => prevIndex - 1);
      setTranslateX((prev) => prev + cardWidthPercentage); // Move one card right
    }
  };

  const isPrevDisabled = productIndex === 0;
  const isNextDisabled = productIndex >= products.length - productsToShow;
  return (
    <div className="py-6 bg-gray-100">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-[80%] mx-auto">
          {/* Flash Sale Header */}
          <div className="flex gap-12 items-center mb-6">
            <h2 className="flex gap-2 items-center text-2xl font-bold text-red-500">
              <ArrowTrendingUpIcon className="w-6 h-6 text-red-500" /> Best Selling Products
            </h2>
          </div>

          {/* Product Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {products.map((product, index) => (
                <div key={index} className="w-1/4 p-3 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {/* Carousel Controls */}
            <div className="absolute inset-y-0 left-0 flex items-center ">
              <button
                onClick={handlePrevProduct}
                disabled={isPrevDisabled}
                className={`p-2 bg-blue-200 rounded-full shadow ${
                  isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'
                }`}
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={handleNextProduct}
                disabled={isNextDisabled}
                className={`p-2 bg-blue-200 rounded-full shadow ${
                  isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'
                }`}
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-500 ml" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button 
        onClick={handleViewMore}
        className="text-white font-medium bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg">
          View All Products
        </button>
      </div>
    </div>
  )
}

export default BestSellingProducts
