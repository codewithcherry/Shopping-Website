import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

const ProductCard = ({product}) => {
  const navigate = useNavigate();

  const addToRecentViewedLocal = (id) => {
    // Retrieve the recently viewed items from localStorage
    const recentItems = JSON.parse(localStorage.getItem('recentItems')) || [];
    
    // If there are more than 10 items, remove the oldest item (first item)
    if (recentItems.length >= 10) {
      recentItems.shift();
    }
    
    // Add the new product ID to the recentItems array
    recentItems.push(id);
    
    // Store the updated array back in localStorage as a string
    localStorage.setItem('recentItems', JSON.stringify(recentItems));
  }

    const openInNewTab = (id) => {
        // Opens the URL in a new tab
        addToRecentViewedLocal(id)
        window.open(`/product/${id}`, '_blank', 'noopener,noreferrer');
    };
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105" onClick={()=>openInNewTab(product._id)}>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-48 object-contain"
      />
      <div className="p-4">
        <h2 className="text-md  font-semibold">{product.title}</h2>
        <p className='h-8 mt-1 text-xs overflow-hidden'>{product.shortDescription.slice(0,60)}...</p>
        <div className="flex  items-center gap-2 mt-2">
        <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.342 1.185-6.058 5.838 1.434 8.249L12 18.897l-7.386 3.888 1.434-8.249-6.058-5.838 8.342-1.185z" />
        </svg>
        <span className='text-sm text-gray-600'>0 Rating</span>
        </div>
       {/* Price Information */}
      <div className="my-2 flex gap-4 items-baseline">
        <h2 className="text-xl  font-semibold text-blue-600">${product.finalPrice.toLocaleString()}</h2>
        <p className="text-sm  text-gray-500 line-through">${product.basePrice.toLocaleString()}</p>
        <p className="text-xs  text-green-500 font-semibold">{product.discount}% off</p>
      </div>
      </div>
    </div>
    </div>
  )
}

export default ProductCard
