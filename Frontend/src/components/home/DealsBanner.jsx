import React from 'react';
import { Link } from 'react-router-dom';

const DealsBanner = ({ productName, discountDescription, imageUrl, productId }) => {
  return (
    <div 
      className="w-full relative flex items-center h-96 bg-cover bg-no-repeat bg-center text-white p-8"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 "></div>
      
      <div className="relative z-10 flex w-full max-w-4xl mx-auto px-4">
        {/* Left side content */}
        <div className="w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold">{productName}</h2>
          <p className="text-lg text-gray-400 font-medium">{discountDescription}</p>
          <Link
            to={`/product/${productId}`}
            className="inline-block mt-4  py-2  text-gray-400 underline-offset-8 underline hover:text-white font-semibold  transition-colors"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealsBanner;
