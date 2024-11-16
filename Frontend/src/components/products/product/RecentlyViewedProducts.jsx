import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../Alert/Loading'; // Assuming you have a Loading component
import ProductCard from '../ProductCard'; // Assuming you have a ProductCard component
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const RecentlyViewedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // For sliding through products
  const [productIndex, setProductIndex] = useState(0); // For managing the carousel
  const [isSliding, setIsSliding] = useState(false); // To control the sliding animation

  const productsToShow = 4; // Number of products to show at a time

  // Fetch recent products from the server based on productIds
  const fetchRecentProductsFromServer = async (productIds) => {
    try {
      const response = await axios.post('http://localhost:3000/products/get-recent-products', { products: productIds });
      // Reverse the array here before setting it to state
      const reversedProducts = response.data.reverse();
      setProducts(reversedProducts); // Set the reversed products to state
      setShowProducts(true);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setShowProducts(false);
    }
  };

  // Effect to get the recently viewed products from localStorage
  useEffect(() => {
    const recentItems = JSON.parse(localStorage.getItem('recentItems')) || [];

    // If no recently viewed items, hide the product list
    if (recentItems.length === 0) {
      setShowProducts(false);
      setLoading(false); // Stop loading as there's no product to show
    } else {
      fetchRecentProductsFromServer(recentItems);
    }
  }, []);

  // Handle the sliding behavior
  const handleNextProduct = () => {
    if (productIndex < products.length - productsToShow && !isSliding) {
      setIsSliding(true); // Start sliding animation
      setProductIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevProduct = () => {
    if (productIndex > 0 && !isSliding) {
      setIsSliding(true); // Start sliding animation
      setProductIndex(prevIndex => prevIndex - 1);
    }
  };

  // Reset sliding animation state after transition
  useEffect(() => {
    if (isSliding) {
      const timer = setTimeout(() => {
        setIsSliding(false); // Reset sliding state after animation duration
      }, 300); // Match this to the duration of the sliding animation (in ms)
      return () => clearTimeout(timer);
    }
  }, [isSliding]);

  const visibleProducts = products.slice(productIndex, productIndex + productsToShow);

  // Check if sliding buttons should be disabled
  const isPrevProductDisabled = productIndex === 0;
  const isNextProductDisabled = productIndex >= products.length - productsToShow;

  return (
    <div className="py-6 bg-gray-100">
      {showProducts ? (
        <div>
          {loading ? (
            <Loading /> // Show loading spinner if fetching data
          ) : (
            <div className='w-[90%] mx-auto mb-4'>
              {/* Header and Carousel Controls */}
              <div className=" flex justify-between items-center mb-4">
                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800">Recently Viewed Products</h2>

                {/* Arrow Buttons */}
                {products.length > productsToShow && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePrevProduct}
                      disabled={isPrevProductDisabled}
                      className={`text-gray-500 ${
                        isPrevProductDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'
                      }`}
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNextProduct}
                      disabled={isNextProductDisabled}
                      className={`text-gray-500 ${
                        isNextProductDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'
                      }`}
                    >
                      <ChevronRightIcon className="h-6 w-6" />
                    </button>
                  </div>
                )}
              </div>

              {/* Product Carousel */}
              <div className="overflow-hidden">
                <div
                  className={`flex p-3 bg-gray-100 rounded-md transition-transform duration-300 ease-in-out ${
                    isSliding ? 'transform' : ''
                  }`}
                  style={{
                    transform: `translateX(-${productIndex * (100 / productsToShow)}%)`,
                  }}
                >
                  {products.map((product, index) => (
                    <div key={index} className="w-1/4 flex-shrink-0 px-2">
                      <ProductCard product={product} /> {/* Render ProductCard for each product */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p></p> // Show message if no products to display
      )}
    </div>
  );
};

export default RecentlyViewedProducts;
