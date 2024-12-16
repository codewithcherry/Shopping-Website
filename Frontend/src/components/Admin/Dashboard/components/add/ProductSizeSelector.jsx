import React, { useState, useEffect } from 'react';

const sizeOptions = {
  Shoes: ["6", "7", "8", "9", "10", "11", "12"],
  Tops: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  Pants: ["28", "30", "32", "34", "36", "40", "42"],
  Phones:['64 GB',"128 GB","512 GB",'1 TB','2 Tb'],
  kids:['1yr','2-3 yrs','4-6 yrs','7-9 yrs','10-12 yrs'],
  other:['os']
};

const ProductSizeSelector = ({ onSizeSelectionChange }) => {
  const [selectedClothingType, setSelectedClothingType] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    // Trigger callback whenever the clothing type or sizes selection changes
    onSizeSelectionChange(selectedClothingType, selectedSizes);
  }, [selectedClothingType, selectedSizes, onSizeSelectionChange]);

  const handleClothingTypeChange = (event) => {
    const clothingType = event.target.value;
    setSelectedClothingType(clothingType);
    setSizes(sizeOptions[clothingType] || []);
    setSelectedSizes([]); // Reset selected sizes when clothing type changes
  };

  const toggleSizeSelection = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size) // Deselect size
        : [...prevSizes, size] // Select size
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Product Size</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-2">Size Type:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={selectedClothingType}
            onChange={handleClothingTypeChange}
          >
            <option value="">Select a clothing type</option>
            {Object.keys(sizeOptions).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {sizes.length > 0 && (
          <div className="space-y-2">
            <label className="block text-gray-600 text-sm font-medium mb-2">Pick Available Size:</label>
            <div className="grid grid-cols-3 gap-4">
              {sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => toggleSizeSelection(size)}
                  className={`cursor-pointer border rounded-lg p-2 text-center 
                    ${selectedSizes.includes(size) ? 'bg-green-300 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
