import React, { useContext } from 'react'
import { useState } from 'react';
import { AuthContext } from '../../Navigation/UserAuthContext';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const baseURL=import.meta.env.VITE_API_BACKEND;

const ProductSummaryForm = ({sizes,item}) => {
    const [quantity, setQuantity] = useState(1);
    const [isWished, setIsWished] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const navigate=useNavigate()

    const {isLogged} =useContext(AuthContext);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    

    const handleSizeClick = (size) => {
        setSelectedSize(size);
        
    };

    const addProductToLocalCart = () => {
        const localCart = localStorage.getItem('cart');
        
        // Initialize the cart if it doesn't exist
        if (!localCart) {
            localStorage.setItem('cart', JSON.stringify({ products: [], subtotal: 0, discount: 0, deliveryFee: 0, tax: 0, total: 0 }));
        }
    
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartProducts = cart.products;
        
        // Calculate subtotal and total
        const subtotal = cart.subtotal + quantity * item.basePrice;
        const total = cart.total + quantity * item.finalPrice;
        const delivery = total > 199 ? 0 : 25;
        
        // Assuming discount is a fixed value or percentage, adjust accordingly
        const discount = subtotal-total; // Set discount calculation as needed
    
        // Add the product to the cart
        cartProducts.push({ productId: item, quantity: quantity, size: selectedSize });
        
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify({
            products: cartProducts,
            subtotal: subtotal,
            discount: discount,
            deliveryFee: delivery,
            tax: 0,
            total: total
        }));
        navigate('/cart')
        
    }

    const addProductToServerCart=async(productId)=>{

        // Retrieve the token from local storage
    const token = localStorage.getItem('jwtToken'); // Replace 'yourTokenKey' with the actual key used for storing the token

    try {
      const response = await axios.post(
        baseURL+'/products/add-cartItem',
        { productId,quantity,selectedSize },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      console.log(response.data) // Clear any previous errors
      navigate('/cart')
    } catch (err) {
      console.log(err)
    }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isLogged){
            return addProductToLocalCart()
        }
        return addProductToServerCart(item._id)
    };


    return (
        <form  onSubmit={handleSubmit}>
            <div className="flex flex-wrap space-x-2 my-2">
                    {sizes.map((size) => (
                        <button
                            type='button'
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
            <input type="hidden" name="productId" value={item._id} />

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
