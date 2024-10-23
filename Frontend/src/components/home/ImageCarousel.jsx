
// Carousel.jsx
import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const images = [
        'https://cdn.confident-group.com/wp-content/uploads/2018/04/23150515/COVER-10-Furniture-Essentials-For-Every-Home.jpg',
        'https://static-assets.business.amazon.com/assets/in/24th-jan/705_Website_Blog_Appliances_1450x664.jpg.transform/1450x664/image.jpg',
        'https://static.cdn.packhelp.com/wp-content/uploads/2019/01/06154209/P1310201-2.png',
      ];
    

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 4000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Handle button click to stop automatic sliding
  const handleButtonClick = (action) => {
    clearInterval(intervalId); // Stop automatic sliding
    action();
  };

  return (
    <div className="relative w-full max-w-[1244px] max-h-[500px] mx-auto overflow-hidden">
      <div
        className={`flex transition-transform duration-500 ease-in-out transform`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto"
          />
        ))}
      </div>

      

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
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

export default Carousel;
