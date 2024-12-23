import React from 'react'
import {TrashIcon,PencilSquareIcon} from "@heroicons/react/24/outline"
import { useNavigate } from 'react-router-dom';

const AdminProductCard = ({product,onEdit,onDelete}) => {
    const { title, sku, status, images } = product;

    const navigate=useNavigate()

    const handleViewProduct=(id)=>{
      console.log(id)
      navigate(`/admin/dashboard/products/${id}`)
    }

    return (
      <div 
      onClick={()=>handleViewProduct(product._id)}
      className=" relative max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
        <img
          className="w-full h-48 object-contain"
          src={images[0]}
          alt={title}
        />
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 ">{title}</h3>
          <p className="text-xs text-gray-500">SKU: {sku}</p>
          <p className={`absolute top-2 left-0 px-1 text-sm font-medium text-center ${status === 'in stock' ? 'bg-green-500 max-w-16 rounded-r-lg text-white  my-2' : 'bg-red-500 max-w-24 rounded-r-lg text-white  my-2'}`}>
            {status}
          </p>
        <div className="flex  items-center gap-2 mt-2">
        <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.342 1.185-6.058 5.838 1.434 8.249L12 18.897l-7.386 3.888 1.434-8.249-6.058-5.838 8.342-1.185z" />
        </svg>
        <span className='text-sm text-gray-600'>{product.ratings || 0} Rating</span>
        </div>
          <p className='h-8 mt-1 text-xs overflow-hidden'>{product.shortDescription.slice(0,60)}...</p>
       {/* Price Information */}
      <div className="my-2 flex gap-4 items-baseline">
        <h2 className="text-xl  font-semibold text-blue-600">${product.finalPrice.toLocaleString()}</h2>
        <p className="text-sm  text-gray-500 line-through">${product.basePrice.toLocaleString()}</p>
        <p className="text-xs  text-green-500 font-semibold">{product.discount}% off</p>
      </div>
          {/* <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              <PencilSquareIcon className='w-6 h-6' />  
            </button>
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              <TrashIcon className='w-6 h-6' />
            </button>
          </div> */}
        </div>
      </div>
    );
  };


export default AdminProductCard
