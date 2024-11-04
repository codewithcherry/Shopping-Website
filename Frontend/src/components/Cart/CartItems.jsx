import React, { useState, useEffect, useContext } from 'react';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'; // Correct Heroicons import
import { PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon} from '@heroicons/react/24/solid';
import { AuthContext } from '../Navigation/UserAuthContext';
import {removeCartItemLocal,updateCartTotalsLocal,handleIncrementQuantityLocal,handleDecrementQuantityLocal} from './cart'

const CartItems = ({ products, loading ,refreshCart}) => {
  // State for showing the empty cart message
  const [items, setItems] = useState([]);

  const {islogged} = useContext(AuthContext);



const incrementQuantity = (productId) => {
  if (!islogged) {
    handleIncrementQuantityLocal(productId);
    refreshCart(); // Refresh cart after increment
  }
};

const decrementQuantity = (productId) => {
  if (!islogged) {
    handleDecrementQuantityLocal(productId);
    refreshCart(); // Refresh cart after decrement
  }
};

const handleRemoveCartItem = (productId) => {
  if (!islogged) {
    removeCartItemLocal(productId);
    refreshCart(); // Refresh cart after item removal
  }
};

  useEffect(() => {
    setItems(products || []);
  }, [products]);

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
              src={item.product.images[0]}
              alt={item.product.title}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700">{item.product.title}</h3>
              <div className="my-2 flex gap-4 items-baseline">
                  <h2 className="text-xl  font-semibold text-blue-600">${item.product.finalPrice.toLocaleString()}</h2>
                  <p className="text-sm  text-gray-500 line-through">${item.product.basePrice.toLocaleString()}</p>
                  <p className="text-xs  text-green-500 font-semibold">{item.product.discount}% off</p>
            </div>
              
              {item.product.status=='in stock' ? (
                <p className="text-sm w-20 rounded-2xl text-center mt-1 bg-green-500 text-white ">{item.product.status}</p>
              ) : (
                <p className="text-sm w-20 rounded-2xl text-center mt-1 bg-red-500 text-white">{item.product.status}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {item.size && <div><label htmlFor="size" className='text-sm m-1'>size</label>
               <input className="bg-gray-100 w-6 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring" type="text" value={item.size} disabled />
               </div>}
              <div className="flex items-center">
                <button
                  className="p-1 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  onClick={() => decrementQuantity(item.product._id)}
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="p-1 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                  onClick={() => incrementQuantity(item.product._id)}
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
                onClick={()=>handleRemoveCartItem(item.product._id)}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="text-lg font-semibold text-gray-800">${item.product.finalPrice}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
