import React from 'react';

const PaymentSummary = ({ cartItems, address }) => {
  // Calculate the subtotal, delivery fee, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.productId.finalPrice * item.quantity, 0);
  const deliveryFee = subtotal < 199 ? 25 : 0; // Example static delivery fee
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Cart Items */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
       <div className='grid grid-cols-3 gap-3'>
       {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-4 pb-4 border-b">
            <img
              src={item.productId.images[0]}
              alt={item.productId.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <p className="text-lg font-medium">{item.productId.title}</p>
              <div className="text-gray-700 text-sm flex items-center">
                <span>${item.productId.finalPrice}</span>
                <span className="ml-2">x {item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
       </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
        <p className="text-gray-800 font-medium">{address.fullName}</p>
        <p className="text-gray-600">{address.streetArea}, {address.doorNumber}</p>
        <p className="text-gray-600">{address.city}, {address.state} - {address.postalCode}</p>
        <p className="text-gray-600">Phone: {address.phoneNumber}</p>
      </div>

      {/* Price Details */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="text-gray-700">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-red-600">
          <span>Promo</span>
          <span>-${deliveryFee > 0 ? deliveryFee.toFixed(2) : '0.00'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Delivery Fee</span>
          <span className="text-gray-700">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-4">
          <span>Total</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
