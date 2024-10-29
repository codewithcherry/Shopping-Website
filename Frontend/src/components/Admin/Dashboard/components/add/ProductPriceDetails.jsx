import React, { useState, useEffect } from 'react';

const ProductPriceDetails = ({ onPriceChange }) => {
  const [basePrice, setBasePrice] = useState();
  const [discount, setDiscount] = useState();
  const [finalPrice, setFinalPrice] = useState(0);

  // Effect to calculate final price based on base price and discount
  useEffect(() => {
    const calculatedFinalPrice = basePrice - (basePrice * (discount / 100));
    setFinalPrice(calculatedFinalPrice);
  }, [basePrice, discount]);

  // Effect to send price data to the parent component whenever it changes
  useEffect(() => {
    onPriceChange({ basePrice, discount, finalPrice });
  }, [basePrice, discount, finalPrice, onPriceChange]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h1 className="text-lg font-semibold text-gray-700 mb-4">Price Details</h1>
      <div className='grid grid-cols-2 gap-4'>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Base Price</label>
        <input
          type="number"
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Discount (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Final Price</label>
        <input
          type="number"
          value={finalPrice}
          readOnly
          className="w-full border border-gray-300 p-2 rounded bg-gray-100"
        />
      </div>
      </div>
    </div>
  );
};

export default ProductPriceDetails;
