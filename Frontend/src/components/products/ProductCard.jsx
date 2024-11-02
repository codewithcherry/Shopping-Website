import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

const ProductCard = ({product}) => {
  const navigate = useNavigate();

    const openInNewTab = (id) => {
        // Opens the URL in a new tab
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
        <h2 className="text-md text-center font-semibold">{product.title}</h2>
        <div className="flex justify-center  items-center gap-2 mt-2">
        <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.342 1.185-6.058 5.838 1.434 8.249L12 18.897l-7.386 3.888 1.434-8.249-6.058-5.838 8.342-1.185z" />
        </svg>
        <span className='text-sm text-gray-600'>0 Rating</span>
        </div>
        <p className="text-xl text-center font-bold mt-2">${product.finalPrice}</p>
        <Link
          to={`/product/${product._id}`}
          className="block mt-4 bg-blue-500 text-white text-center py-2 rounded-lg transition-colors hover:bg-blue-600"
        >
          Add to cart
        </Link>
      </div>
    </div>
    </div>
  )
}

export default ProductCard
