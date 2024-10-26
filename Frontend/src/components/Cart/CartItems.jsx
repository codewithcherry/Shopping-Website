import React, { useState, useEffect } from 'react';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'; // Correct Heroicons import
import { PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon} from '@heroicons/react/24/solid';

const CartItems = ({ cartItems, loading }) => {
  // State for showing the empty cart message
  const [items, setItems] = useState(cartItems);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  return (
    <div className="p-6 bg-gray-50 w-full rounded-lg shadow-lg ">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Cart</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <ShoppingCartIcon className="h-12 w-12 text-gray-400 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <ShoppingCartIcon className="h-16 w-16 mb-2" />
          <p>No items in the cart</p>
        </div>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-4 rounded-lg mb-4 shadow transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price}</p>
              {item.stock ? (
                <p className="text-sm text-green-500">In Stock</p>
              ) : (
                <p className="text-sm text-red-500">Out of Stock</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <select
                className="bg-gray-100 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring"
                defaultValue={item.size}
              >
                {item.sizes.map((size, idx) => (
                  <option key={idx} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <div className="flex items-center">
                <button
                  className="p-1 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  onClick={() => item.decrementQuantity(item.id)}
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="p-1 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  onClick={() => item.incrementQuantity(item.id)}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex space-x-3 items-center">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => item.saveForLater(item.id)}
              >
                <HeartIcon className="h-5 w-5" />
              </button>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => item.deleteItem(item.id)}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="text-lg font-semibold text-gray-800">${item.price}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;