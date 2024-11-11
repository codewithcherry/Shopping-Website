import React from 'react'
import { useState } from 'react';
import Loading from '../Alert/Loading'

const CheckoutCartSummary = ({cartItems,loading}) => {
  // Calculate the subtotal, delivery fee, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.productId.finalPrice * item.quantity, 0);
  const deliveryFee = subtotal<199?25:0; // Example static delivery fee
  const total = subtotal + deliveryFee;

  const [promoCode, setPromoCode] = useState('');

  const handlePromoCodeChange = (e) => setPromoCode(e.target.value);
  const applyPromoCode = () => {
    // Logic for applying promo code (placeholder)
    console.log('Promo code applied:', promoCode);
  };

  return (
    <div className="max-w-lg bg-white shadow-lg rounded-lg p-6 mt-6">
      {loading?<Loading />: <div>
      {/* Cart Items */}
      <div className="p-4 ">
        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-4 border-b pb-4">
            {/* Image */}
            <img
              src={item.productId.images[0]}
              alt={item.productId.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            {/* Title */}
            <div className="flex-1 ml-4">
              <p className="text-lg font-medium">{item.productId.title}</p>
              {/* Quantity and Price */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700">${item.productId.finalPrice}</span>
                    <span className="text-gray-500">x {item.quantity}</span>
                </div>
            </div>
            
          </div>
        ))}
      </div>
      {/* promo application */}

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
            className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
        
      </div>

      {/* Pricing Information */}
      <div className=" p-4">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Subtotal</span>
          <span className="text-gray-700">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Promo</span>
          <span className="text-red-700">-${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Delivery Fee</span>
          <span className="text-gray-700">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
        
      </div>
        <button className='bg-indigo-400 text-center mx-auto text-white font-semibold p-2 mt-4 rounded-lg hover:bg-indigo-600'>
            Proceed to pay
        </button>

        </div>
        }
    </div>
  );
}

export default CheckoutCartSummary
