import React, { useContext, useState } from 'react';
import ReviewSummary from './ReviewSummary';
import ProductSummaryForm from './ProductSummaryForm';
import {ShareIcon} from "@heroicons/react/24/outline"
import {HeartIcon} from '@heroicons/react/24/solid'
import axios from 'axios';
import { AuthContext } from '../../Navigation/UserAuthContext';

const baseURL=import.meta.env.VITE_API_BACKEND;

const ProductSummary = ({product,setAlert}) => {
    const [isWished,setIsWished]=useState(false)
    const [isExpanded, setIsExpanded] = useState(false);

    const {isLogged}=useContext(AuthContext);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const lines = product.description.split('\n'); // Split the description into lines

    const addProductToWishlist =async(productId)=>{
      console.log(productId)
      try{
        const token=localStorage.getItem('jwtToken');
        const response=await axios.post(baseURL+'/user/add-to-wishlist',{productId},
          {
            headers:{
              "Authorization":`Bearer ${token}`,
              "Content-Type":"Application/json"
            }
          }
        )
        console.log(response.data)
        setAlert({type:"success",message:"Added to wishlist successfully"});
      }
      catch(err){
        console.log(err)
        setAlert({type:"error",message:"failed to add to wishlist"});
      }
    }
  
  const handleWishlistClick = (productId) => {
    setIsWished(!isWished);
    // Handle the logic to add to wishlist (e.g., API call)
    console.log(isWished ? 'Removed from Wishlist' : 'Added to Wishlist');
    if(!isLogged){
      console.log('Login to your account to add to wishlist')
    }
    else{
        addProductToWishlist(productId);
    }
    };

  return (
    <div className="relative max-w-2xl p-4 md:p-6 lg:p-8 border rounded-lg shadow-lg bg-white">
      {/* Product Title and Brand */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.title}</h1>
      <p className="text-gray-500 text-sm md:text-base mb-2">Brand: {product.brand}</p>

        <div>
            <ReviewSummary  ratingsData={product.ratingsData} ratings={product.ratings}/>
        </div>
      {/* Short Description */}
      <p className="text-gray-700 text-sm md:text-base mb-4">{product.shortDescription}</p>

      {/* Price Information */}
      <div className="mb-4 flex gap-4 items-end">
        <h2 className="text-xl md:text-2xl font-semibold text-green-600">${product.finalPrice.toLocaleString()}</h2>
        <p className="text-sm md:text-base text-gray-500 line-through">${product.basePrice.toLocaleString()}</p>
        <p className="text-sm md:text-base text-green-500 font-semibold">Save {product.discount}%</p>
      </div>

      {/* wishlist and share link */}
      <div className='absolute flex gap-4 top-4 right-4'>
        <HeartIcon       
                    onClick={()=>handleWishlistClick(product._id)}
                    className={` ${isWished ? 'w-6 h-6 text-red-500' : 'w-6 h-6 text-gray-500 hover:cursor-pointer hover:scale-125'} `}>
        </HeartIcon>
        <ShareIcon className='w-6 h-6' />
      </div>

      {/* Stock Status */}
      <div className="mb-4">
        <p className="text-sm md:text-base font-semibold">
          {" "}
          <span
            className={`${
              product.status === "in stock" ? "bg-green-600 text-sm px-2 text-white p-1 rounded-lg" : "bg-red-600 text-sm px-2 text-white p-1 rounded-lg"
            }`}
          >
            {product.status}
          </span>
        </p>
      </div>

      {/* product cart form */}

      <ProductSummaryForm  sizes={product.sizes} item={product}/>

      {/* Additional Information */}
      <div className="mt-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Additional Information</h3>
            <p
                className={`text-gray-700 text-sm md:text-base whitespace-pre-line ${
                    isExpanded ? '' : 'line-clamp-2' // Use a utility for line clamping
                }`}
            >
                {product.description}
            </p>
            <button 
                onClick={toggleExpand} 
                className="text-blue-600 hover:underline mt-2"
            >
                {isExpanded ? 'Show Less' : 'Show More'}
            </button>
        </div>
    </div>
  );
};

export default ProductSummary;
