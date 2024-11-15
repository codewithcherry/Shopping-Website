import React, { useState, useEffect, useRef } from 'react';
import DealsBanner from './DealsBanner';

const DealCarousel = () => {
  const deals = [
    
    {
      title: "macbook pro m4 series",
      imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731663759/macbook-pro-deals-banner-rs_egnske.jpg",
      discount: 20,
      productId: "6724f9434bc1b5a041a41289"
    },
    {
        title: "Sony SHC200 series",
        imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731663759/jbl-headphones-deals-banner-rs_uzdird.jpg",
        discount: 15,
        productId: "6724f9434bc1b5a041a41289"
      },
      {
        title: "iPhone 16 Series",
        imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731663758/iphon-16-deal-banner-rs_mafara.jpg",
        discount: 18,
        productId: "6724ef6f4bc1b5a041a41263"
      },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalId = useRef(null); // Use useRef to store interval ID

  useEffect(() => {
    // Start the automatic sliding
    intervalId.current = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(intervalId.current); // Cleanup on unmount
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % deals.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + deals.length) % deals.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative -z-1 w-[80%] mt-[0.5px] max-h-[700px] mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {deals.map((item, index) => (
          <div key={index} className="min-w-full flex-shrink-0">
            <DealsBanner
              productName={item.title}
              discountDescription={`Up to ${item.discount}% off Voucher`}
              imageUrl={item.imageUrl}
              productId={item.productId}
            />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {deals.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-indigo-500' : 'bg-gray-300'} transition-colors duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default DealCarousel;
