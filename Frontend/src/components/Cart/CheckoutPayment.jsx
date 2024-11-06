import React from 'react'
import CheckoutCartSummary from './CheckoutCartSummary'

const CheckoutPayment = () => {
    const cartItems = [
        {
          title: 'Product 1',
          price: 29.99,
          quantity: 2,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 2',
          price: 19.99,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 3',
          price: 39.99,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
        },
      ];
  return (
    <div>
     <CheckoutCartSummary cartItems={cartItems} />
    </div>
  )
}

export default CheckoutPayment
