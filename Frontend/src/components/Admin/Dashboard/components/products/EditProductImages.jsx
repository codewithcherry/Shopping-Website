import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrashIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";

const baseURL=import.meta.env.VITE_API_BACKEND;

const EditProductImages = ({ images = [], id,setAlert}) => {
  const [uploading, setUploading] = useState(false);
  const [productImages, setProductImages] = useState(images);
  const [removedImages, setRemovedImages] = useState([]);
  const [newUploadImages,setNewUploadImages]=useState([]);
  const [updateStatus,setUpdateStatus]=useState(false);

  const adminToken=localStorage.getItem('adminToken');

  const handleImageChange = async (e) => {
    setUploading(true);
    const file = e.target.files[0]; // Get the first file only
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          baseURL+"/upload/add-product-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newImageUrl = response.data.imageUrl;

        // Update local images state
        setProductImages((prevImages) => [...prevImages, newImageUrl]);
        setNewUploadImages((prevImages) => [...prevImages, newImageUrl]);

        setUploading(false);
      } catch (err) {
        console.log(err);
        setUploading(false); // Make sure to reset uploading in case of error
      }
    }
  };

  const handleRemoveImage = (index) => {
    const removedImage = productImages[index];
    setRemovedImages((prevRemoved) => [...prevRemoved, removedImage]);
    const updatedImages = productImages.filter((_, i) => i !== index);
    setProductImages(updatedImages);
    
    console.log(removedImage)
  };

  const handleDiscardChanges = () => {
    setProductImages(images);
    setRemovedImages([]);
   
  };

  const handleUpdate = async () => {
    try {
      // Set the update status to true to show loading state
      setUpdateStatus(true);
      
      // Make the API request to update product images
      const response = await axios.post(
        `http://localhost:3000/admin/update-product-image?id=${id}`,
        { productImages, removedImages },
        {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        }
      );
  
      // If response is successful, update alert with the response data
    //   console.log(response.data);
      setAlert({
        type: 'success',
        message: 'Product images updated successfully!',
      });
    } catch (err) {
      // Handle potential errors
    //   console.error('Error updating product images:', err);
  
      // If there's no response data, provide a default error message
      const errorMessage = err?.response?.data?.message || 'Something went wrong. Please try again.';
  
      setAlert({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      // Reset update status regardless of success or failure
      setUpdateStatus(false);
    }
  };
  

  // Effect to log latest productImages after state changes
//   useEffect(() => {
//     // console.log("Updated product images:", productImages);
//     // console.log("Removed images:", removedImages);
//   }, [productImages, removedImages]);

  return (
    <div className="flex justify-center mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 max-w-[400px] sm:max-w-lg md:max-w-xl lg:max-w-4xl mt-6">
      {/* Image Section */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-black mb-4">Update Product Images</h2>

        {/* Main Image Preview */}
        <div className="relative w-full max-w-[256px] h-64 bg-gray-100 rounded-lg flex justify-center items-center mb-4">
          {productImages[0] ? (
            <img
              src={productImages[0]}
              alt="Main product image preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-400">No Image Selected</span>
          )}
        </div>

        {/* Thumbnail and Upload Section */}
        <div className="flex flex-wrap gap-2">
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

          {/* Upload Button */}
          {productImages.length < 4 && (
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition"
            >
              <span className="sr-only">Upload product images</span>
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 my-4">
          <button
            onClick={handleDiscardChanges}
            className="text-md text-white font-semibold bg-gray-500 hover:bg-gray-600 rounded-xl shadow-lg px-4 py-2 transition"
          >
            Discard
          </button>
          <button
            onClick={handleUpdate}
            className="text-md text-white font-semibold bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-lg px-4 py-2 transition"
          >
           {updateStatus?'Updating':"Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductImages;
