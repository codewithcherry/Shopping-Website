import React, { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { TrashIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'; // Import icons from Heroicons
import Loading from '../../../../Alert/Loading';
import Alert from '../../../../Alert/Alert';
import axios from 'axios';

const EditAdminProductForm = () => {
  const [product,setProduct]=useState({})
  const [loading,setLoading]=useState(false);
  const [alert,setAlert]=useState();
  const [uploading, setUploading] = useState(false);
  const productImages = product.images || [];

  const location = useLocation();

  // Create a URLSearchParams object from the query string
  const queryParams = new URLSearchParams(location.search);

  // Get the value of a specific query parameter
  const productId = queryParams.get('pid');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file)); // preview images
    setProduct({ ...product, images: [...product.images, ...newImages] });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., save to backend)
    console.log('Product Updated:', product);
  };

  const adminToken=localStorage.getItem('adminToken')

    const fetchProductDetails=async (productId) => {
        try {
            setLoading(true)
            const response=await axios.get(`http://localhost:3000/admin/get-product/${productId}`,{
                headers:{
                    Authorization:`Bearer ${adminToken}`
                }
            })
            console.log(response.data);
            setProduct(response.data)
        } catch (error) {
            console.log(error)
            setAlert(error.response.data)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductDetails(productId);
    },[])

  return (
    <>
    {alert&& <Alert type={alert.type} message={alert.message} onClose={()=>{setAlert(null)}} />}
    {loading?<Loading />:
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Product details</h2>

      {/* Product Title and Brand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Short Description and Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={product.shortDescription}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          rows="4"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stock Quantity and SKU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Base Price and Discount */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Base Price</label>
          <input
            type="number"
            id="basePrice"
            name="basePrice"
            value={product.basePrice}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Final Price */}
      <div className="mb-6">
        <label htmlFor="finalPrice" className="block text-sm font-medium text-gray-700">Final Price</label>
        <input
          type="number"
          id="finalPrice"
          name="finalPrice"
          value={product.finalPrice}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sizes Field */}
      <div className="mb-6">
        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Sizes</label>
        <input
  type="text"
  id="sizes"
  name="sizes"
  value={(product.sizes || []).join(', ')}  // Ensure it's always an array
  onChange={(e) =>
    handleChange({
      target: {
        name: 'sizes',
        value: e.target.value.split(',').map((size) => size.trim()),
      },
    })
  }
  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
      </div>

      {/* restock date section */}

      {/* Restock Date Field */}
      <div className="mb-6">
        <label htmlFor="restockDate" className="block text-sm font-medium text-gray-700">Restock Date</label>
        <input
          type="date"
          id="restockDate"
          name="restockDate"
          value={product.restockDate}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image Section */}
      <div className="max-w-md  rounded-lg mt-2 mb-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Upload Image</h2>
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg flex justify-center items-center mb-4">
          {productImages[0] ? (
            <img src={productImages[0]} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-gray-400">No Image Selected</span>
          )}
        </div>

        <div className="flex gap-2 ">
          {productImages.map((img, index) => (
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
                <TrashIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
          {productImages.length < 4 && (
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition"
            >
              {!uploading ? (
                <span className="text-2xl text-gray-500">+</span>
              ) : (
                <CloudArrowUpIcon className="animate-ping w-6 h-6" />
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
            </label>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Product
      </button>
    </form>
    }
    </>
  );
};

export default EditAdminProductForm;
