import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Importing star icons for ratings
import { useNavigate } from 'react-router-dom';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Alert from '../../../../Alert/Alert';
import axios from 'axios';

// ProductDetail Component
const ProductDetail = ({ product ,setLoading, setAlert }) => {
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
  
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  //useNavigate hook to navigate
  const navigate=useNavigate()

  //admin token fetch from localStorage

  const adminToken=localStorage.getItem('adminToken');

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

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      // Confirm the deletion with the user before making the request
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;
  
      // Make the API call to delete the product using Axios
      const response = await axios.delete(`http://localhost:3000/admin/delete-product/${id}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`, // Authorization token for admin
        },
      });
  
      // Handle the response after successful deletion
      console.log(response.data);  // You can log it or process it to update your UI
      // setAlert();
      const data={
        type: 'success',
        message: 'Product deleted successfully!',
      }

      navigate('/admin/dashboard/products',{state:data});
  
      // Optionally, you might want to update the state of the products list to reflect the deletion
      // Example: Remove deleted product from state (if you have a state like `products`)
      // setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  
    } catch (err) {
      // Handle any errors from the API request
      console.error('Error deleting product:', err);
      setAlert({
        type: 'error',
        message: err?.response?.data?.message || 'An error occurred while deleting the product.',
      });
    }
    finally{
      setLoading(false)
    }
  };

  const handleAddBestSelling =async (productId) => {
    try {
      const response = await axios.post('http://localhost:3000/admin/add-product-best-selling',{productId},
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      )
      // console.log(response.data);
      setAlert(response.data);
    } catch (err) {
      // console.log(err)
      setAlert(err.response.data)
    }
  }

  const handleAddFlashSale= async (productId) => {
    
    try {
      const response = await axios.post('http://localhost:3000/admin/add-product-flashsale',{productId},
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      )
      // console.log(response.data);
      setAlert(response.data);
    } catch (err) {
      // console.log(err)
      setAlert(err.response.data)
    }
  }
  

  return (
    <div className="max-w-screen-lg mx-auto p-6 lg:p-10 bg-white shadow-xl rounded-lg my-10">
     
      <div className="relative w-full">
      <div className="absolute top-2 right-2">
        {/* Ellipsis Icon */}
        <EllipsisVerticalIcon
          className="w-5 h-5 text-gray-800 hover:text-black hover:cursor-pointer"
          onClick={toggleOptions}
        />

        {/* Options Menu */}
        {isOptionsVisible && (
          <div
            className="absolute w-48 right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg flex flex-col"
            style={{ zIndex: 10 }}
          >
            <button
              className="px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              onClick={() => handleAddFlashSale(_id)}
            >
              Add to Flash Sale
            </button>
            <button
              className="px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              onClick={() => handleAddBestSelling(_id)}
            >
              Add to Best-Selling
            </button>
          </div>
        )}
      </div>
    </div>
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
          <div className="flex justify-between items-center mb-8 mt-2">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                <span className="line-through text-gray-500">${basePrice}</span> ${finalPrice}
              </p>
              <p className="text-lg text-gray-600">You save {discount}%</p>
            </div>
            <div className='flex flex-col gap-2'>
            <button 
            onClick={()=>{handleEdit(_id)}}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg text-md font-medium ">
              Edit Product
            </button>
            <button 
            onClick={()=>{handleDelete(_id)}}
            className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg text-md font-medium ">
              Delete Product
            </button>
            </div>
            
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
