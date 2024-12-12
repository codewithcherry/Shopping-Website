import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Importing star icons for ratings
import { useNavigate } from 'react-router-dom';

// ProductDetail Component
const ProductDetail = ({ product }) => {
  // Destructuring the product object
  const {
    _id,
    title,
    shortDescription,
    description,
    brand,
    category,
    subCategory,
    images = [], // Fallback to an empty array if images are undefined
    stockQuantity,
    status,
    sku,
    restockDate,
    basePrice,
    discount,
    finalPrice,
    sizes,
    ratings,
    ratingsData,
  } = product;

  // Check if images array is empty and use a fallback image if necessary
  const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : ''); // Safe fallback

  //useNavigate hook to navigate
  const navigate=useNavigate()

  // Helper function to render the rating stars
  const renderRating = (rating) => {
    const fullStars = Array.from({ length: 5 }, (_, index) => 
      index < rating ? <FaStar key={index} className="text-yellow-500" /> : <FaRegStar key={index} className="text-gray-300" />
    );
    return fullStars;
  };

  // If no images are available, show a placeholder or message
  if (images.length === 0) {
    return (
      <div className="max-w-screen-lg mx-auto p-6 lg:p-10 bg-white shadow-xl rounded-lg my-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center">
          No images available for this product
        </h1>
      </div>
    );
  }

  const handleEdit=(id)=>{
        navigate(`/admin/dashboard/products/edit?pid=${id}`)
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6 lg:p-10 bg-white shadow-xl rounded-lg my-10">
      {/* Product Title and Short Description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">{title}</h1>
        <p className="text-xl text-gray-500 mt-2">{shortDescription}</p>
      </div>

      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
        {/* Product Images (Thumbnail & Selected Image) */}
        <div className="flex flex-col mx-auto gap-8 mb-10">
          {/* Large Image */}
          <div className="mx-auto">
            <img
              src={selectedImage}
              alt={title}
              className="w-64 h-64 rounded-xl shadow-lg object-cover transition-all transform hover:scale-105"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(image)} // Update selected image on click
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-110 ${selectedImage === image ? 'border-4 border-blue-600' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Ratings and Stock Info */}
        <div>
          {/* Ratings */}
          <div className="flex items-center justify-start mb-2">
            <h2 className="text-2xl font-semibold text-gray-700 mr-4">Customer Ratings</h2>
            <div className="flex items-center">
              {renderRating(ratings)}
              <span className="ml-2 text-gray-600">({ratingsData[1]?.count} reviews)</span>
            </div>
          </div>

          {/* Stock and Availability */}
          <div className="flex justify-between items-center text-gray-700">
            <span className={`text-xl ${stockQuantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-sm text-gray-500">
              Restocking on: {new Date(restockDate).toLocaleDateString()}
            </span>
          </div>

          {/* Pricing Info */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                <span className="line-through text-gray-500">${basePrice}</span> ${finalPrice}
              </p>
              <p className="text-lg text-gray-600">You save {discount}%</p>
            </div>
            <button 
            onClick={()=>{handleEdit(_id)}}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 rounded-lg text-xl hover:scale-105 transform transition-all">
              Edit Product
            </button>
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Product Details</h2>
            <ul className="mt-4 text-lg text-gray-600">
              <li><strong>Brand:</strong> {brand}</li>
              <li><strong>Category:</strong> {category}</li>
              <li><strong>Sub-Category:</strong> {subCategory}</li>
              <li><strong>SKU:</strong> {sku}</li>
              <li><strong>Stock Quantity:</strong> {stockQuantity}</li>
              <li><strong>Status:</strong> {status}</li>
              <li><strong>Restock Date:</strong> {new Date(restockDate).toLocaleDateString()}</li>
              <li><strong>Sizes Available:</strong> {sizes.join(', ')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700">Product Description</h2>
        <p className="text-lg text-gray-600 mt-4">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
