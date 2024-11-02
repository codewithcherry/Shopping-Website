import React from 'react'
import {TrashIcon,PencilSquareIcon} from "@heroicons/react/24/outline"

const AdminProductCard = ({product,onEdit,onDelete}) => {
    const { title, sku, status, images } = product;

    return (
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          className="w-full h-48 object-contain"
          src={images[0]}
          alt={title}
        />
        <div className="p-4">
          <h3 className="text-md font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">SKU: {sku}</p>
          <p className={`text-sm font-medium text-center ${status === 'in stock' ? 'bg-green-500 max-w-16 rounded-lg text-white p-1 my-2' : 'bg-red-500 max-w-24 rounded-lg text-white p-1 my-2'}`}>
            {status}
          </p>
          <div className="flex justify-end space-x-4 mt-4">
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
          </div>
        </div>
      </div>
    );
  };


export default AdminProductCard
