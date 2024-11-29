import React, { useState } from "react";
import { CameraIcon, PlusIcon, StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const CustomerReviewForm = ({productId}) => {
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle visibility
  const [rating, setRating] = useState(0); // Rating state
  const [reviewText, setReviewText] = useState(""); // Review text state
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    setUploading(true);
    const file = event.target.files[0]; // Get the first file only
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:3000/upload/add-review-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newImageUrl = response.data.imageUrl;

        // Update local images state
        setImages((prevImages) => [...prevImages, newImageUrl]);
        setUploading(false);
      } catch (err) {
        console.log(err);
        setUploading(false); // Make sure to reset uploading in case of error
        alert("Image upload failed. Please try again.");
      }
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log({ rating, reviewText, images });
    try{
      const token=localStorage.getItem('jwtToken');
      const response=await axios.post("http://localhost:3000/products/post-review",
        {
          rating:rating,
          reviewText:reviewText,
          images:images,
          productId:productId
        },
        {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }
      )
      console.log(response.data);
      // Reset form
      setRating(0);
      setReviewText("");
      setImages([]);
      setIsFormVisible(false); // Collapse the form after submission
    }
    catch(err){
      console.log(err)
    }
    
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Product Reviews</h2>
        <button
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            if (isFormVisible) {
              // Reset form state when closing the form
              setRating(0);
              setReviewText("");
              setImages([]);
            }
          }}
          className="text-blue-500 hover:underline text-sm focus:outline-none"
        >
          {isFormVisible ? "Discard Review" : "Write a Review"}
        </button>
      </div>

      {/* Expandable Form */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Star Rating */}
          <div>
            <p className="text-gray-700 font-medium">Rating:</p>
            <div className="flex space-x-2 mt-2">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  onClick={() => setRating(index + 1)}
                  className={`h-8 w-8 cursor-pointer ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="review" className="block text-gray-700 font-medium mb-2">
              Your Review:
            </label>
            <textarea
              id="review"
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Write your review here..."
              required
            ></textarea>
          </div>

          {/* Image Upload Section */}
          <div>
            <p className="text-gray-700 font-medium">Add Images:</p>
            <div className="flex items-center space-x-4 mt-2">
              {/* Upload Button */}
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition"
              >
                {uploading ? (
                  <PlusIcon className="animate-ping w-6 h-6 text-gray-500" />
                ) : (
                  <span className="text-2xl text-gray-500">+</span>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview Uploaded Images */}
            <div className="flex flex-wrap gap-2 mt-3">
              {images.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Uploaded preview ${index + 1}`}
                    className="h-16 w-16 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)} // Use index to remove image
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomerReviewForm;
