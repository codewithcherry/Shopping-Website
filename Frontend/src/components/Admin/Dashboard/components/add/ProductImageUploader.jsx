import React, { useState } from 'react';
import {TrashIcon} from '@heroicons/react/24/outline'

const ProductImageUploader = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.slice(0, 4 - images.length); // Limit to max 4 images
    const imageUrls = newImages.map((file) => URL.createObjectURL(file));
    const updatedImages = [...images, ...imageUrls];
    
    setImages(updatedImages);
    onImagesChange(updatedImages); // Send updated images to parent
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages); // Send updated images to parent
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Upload Image</h2>
      <div className="relative w-full h-64 bg-gray-100 rounded-lg flex justify-center items-center mb-4">
        {images[0] ? (
          <img src={images[0]} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-gray-400">No Image Selected</span>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        {images.map((img, index) => (
          <div key={index} className="relative w-20 h-20">
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-lg border border-gray-300"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full focus:outline-none"
            >
              <TrashIcon className='w-3 h-3'/>
            </button>
          </div>
        ))}
        {images.length < 4 && (
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition"
          >
            <span className="text-2xl text-gray-500">+</span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ProductImageUploader;
