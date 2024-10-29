import React from 'react'
import { useState, useEffect } from 'react';

const ProductData =({ onDataChange }) => {
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
  
    // Effect to send data to the parent component whenever it changes
    useEffect(() => {
      onDataChange({ title, shortDescription, description, brand });
    }, [title, shortDescription, description, brand, onDataChange]);
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-lg font-semibold text-gray-700 mb-4">Product Details</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      </div>
    );
  };

export default ProductData
