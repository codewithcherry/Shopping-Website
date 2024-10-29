import React, { useState, useEffect } from 'react';

const ProductStockDetails = ({ onStockChange }) => {
  const [stockQuantity, setStockQuantity] = useState(0);
  const [sku, setSku] = useState('');
  const [restockDate, setRestockDate] = useState('');

  // Effect to send stock data to the parent component whenever it changes
  useEffect(() => {
    onStockChange({ stockQuantity, sku, restockDate });
  }, [stockQuantity, sku, restockDate, onStockChange]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 mb-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h1 className="text-lg font-semibold text-gray-700 mb-4">Stock Details</h1>
      <div className='grid grid-cols-2 gap-4'>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Stock Quantity</label>
        <input
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(Number(e.target.value))}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">SKU</label>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Restock Date</label>
        <input
          type="date"
          value={restockDate}
          onChange={(e) => setRestockDate(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      </div>
    </div>
  );
};

export default ProductStockDetails;
