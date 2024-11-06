import React, { useState, useEffect, useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { InformationCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../Navigation/UserAuthContext';

const CartSummary = ({ subtotal, discount, deliveryFee, tax, total, loading ,setAlert}) => {
  
  const navigate=useNavigate();

  const {isLogged} =useContext(AuthContext);

 

  const handleCheckout =()=>{
    if(!isLogged){
      return setAlert({type:"error",message:"Login to your account to checkout the cart"})
    }
    navigate("/checkout");

  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-2xl ">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Delivery</h2>
      
      <div className="flex items-center space-x-2 mb-2">
        <button className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-sm">Free</button>
        <button className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-sm">Express: $25.00</button>
      </div>
      <p className="text-sm text-gray-500 mb-4">Free delivery for cart value over 199$</p>

      

      {loading ? (
        <div className="flex justify-center items-center h-24">
          <ShoppingCartIcon className="h-12 w-12 text-gray-400 animate-spin" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between text-gray-700 mt-4">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="flex items-center">Discount <span className="text-xs text-gray-400 ml-1">({}%)</span></span>
            <span className="text-red-500">- ${(discount)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="flex items-center">Delivery <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400" /></span>
            <span>${total!=0?deliveryFee:0}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="flex items-center">Tax <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400" /></span>
            <span>+ ${tax}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-gray-800 mt-4">
            <span>Total</span>
            <span>${total>0?total+deliveryFee:0}</span>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700 transition-transform transform hover:scale-105" onClick={handleCheckout}>
            Proceed to checkout
          </button>
          <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-md mt-2 hover:bg-gray-300 transition-transform transform hover:scale-105">
            Continue shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
