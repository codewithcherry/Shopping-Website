import React, { useState, useEffect } from 'react';
import { InformationCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const CartSummary = ({ subtotal, discount, deliveryFee, tax, total, loading }) => {
  const [promoCode, setPromoCode] = useState('');

  const handlePromoCodeChange = (e) => setPromoCode(e.target.value);
  const applyPromoCode = () => {
    // Logic for applying promo code (placeholder)
    console.log('Promo code applied:', promoCode);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-2xl ">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Delivery</h2>
      
      <div className="flex items-center space-x-2 mb-2">
        <button className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-sm">Free</button>
        <button className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-sm">Express: $9.99</button>
      </div>
      <p className="text-sm text-gray-500 mb-4">Delivery date: June 24, 2022</p>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">Promocode</label>
        <div className="flex items-center">
          <input
            type="text"
            value={promoCode}
            onChange={handlePromoCodeChange}
            className="border border-gray-300 rounded-l-md p-2 flex-grow focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter promocode"
          />
          <button
            onClick={applyPromoCode}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-1">20% off discount</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-24">
          <ShoppingCartIcon className="h-12 w-12 text-gray-400 animate-spin" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between text-gray-700 mt-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="flex items-center">Discount <span className="text-xs text-gray-400 ml-1">({discount}%)</span></span>
            <span className="text-red-500">- ${(subtotal * discount / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="flex items-center">Delivery <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400" /></span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="flex items-center">Tax <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400" /></span>
            <span>+ ${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-gray-800 mt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700 transition-transform transform hover:scale-105">
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
