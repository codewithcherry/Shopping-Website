import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../Alert/Loading'; // Assuming you have a Loading component
import ProductCard from '../ProductCard'; // Assuming you have a ProductCard component
import CountDown from './CountDown';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/24/outline';

const FlashSale = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const productsToShow = 4; // Number of products visible at a time
  const cardWidthPercentage = 100 / productsToShow; // Percentage width of a single card

  const productIds = [
    '67250d194bc1b5a041a412d1',
    '6724f7e14bc1b5a041a41283',
    '6724f5744bc1b5a041a41277',
    '6724f7e14bc1b5a041a41283',
    '672513894bc1b5a041a412ef',
    '6724fb6f4bc1b5a041a41295',
    '67250d194bc1b5a041a412d1',
    '6724fa6e4bc1b5a041a4128f',
    '6724f6ac4bc1b5a041a4127d',
    '67250fc64bc1b5a041a412d7',
  ];

  const now = new Date();
  const targetDate = new Date();
  targetDate.setDate(now.getDate() + 3); // Countdown to 3 days from now

  const fetchRecentProductsFromServer = async (productIds) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/products/get-recent-products',
        { products: productIds }
      );
      const reversedProducts = response.data.reverse();
      setProducts(reversedProducts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchRecentProductsFromServer(productIds);
  }, [productIds]);

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
              <ClockIcon className="w-6 h-6 text-red-500" /> Flash Sale
            </h2>
            <CountDown targetDate={targetDate} />
          </div>

          {/* Product Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {products.map((product, index) => (
                <div key={index} className="w-1/4 px-2 flex-shrink-0">
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
        <button className="text-white font-medium bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default FlashSale;