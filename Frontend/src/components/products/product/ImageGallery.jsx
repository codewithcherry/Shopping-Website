import React, { useState } from 'react';

const ImageGallery = ({images}) => {
  // Array of image URLs (replace with your own image URLs)
  

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center">
      {/* Display the selected image */}
      <div className="w-96 h-96 mb-4 bg-gray-200 rounded-md overflow-hidden">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-24 h-24 rounded-md overflow-hidden border-2 ${
              selectedImage === image ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;