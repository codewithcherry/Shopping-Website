import React from 'react'
import { useState } from 'react';

const ProductSummaryForm = ({sizes}) => {
    const [quantity, setQuantity] = useState(1);
    const [isWished, setIsWished] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    

    const handleSizeClick = (size) => {
        setSelectedSize(size);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the logic to add to cart
        console.log('Product ID:');
        console.log('Quantity:', quantity);
    };

    return (
        <form  onSubmit={handleSubmit}>
            <div className="flex flex-wrap space-x-2 my-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => handleSizeClick(size)}
                            className={`py-2 px-4 border rounded-md text-sm font-medium transition duration-200 
                                ${selectedSize === size 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
        </div>
            <input type="hidden" name="productId" value={""} />

            <div className='flex items-center'>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="m-2 w-10 block border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                className="inline-flex justify-center my-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Add to Cart
            </button>
        </form>
    );
}

export default ProductSummaryForm
