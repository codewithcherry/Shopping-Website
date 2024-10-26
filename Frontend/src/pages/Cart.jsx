import React from 'react'
import Navbar from '../components/Navbar'
import CartItems from '../components/Cart/CartItems'
import CartSummary from '../components/Cart/CartSummary';

const Cart = () => {
  const dummyCartItems = [
    {
      id: 1,
      name: "T-Shirt",
      price: 19.99,
      image: "https://content.jdmagicbox.com/quickquotes/images_main/rectangle-brown-printed-packaging-box-2221215362-ia75yc0s.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit", // Replace with a real image URL
      stock: true,
      sizes: ["S", "M", "L", "XL"],
      size: "M", // Default size
      quantity: 2,
      incrementQuantity: (id) => console.log(`Incremented quantity for item ${id}`),
      decrementQuantity: (id) => console.log(`Decremented quantity for item ${id}`),
      saveForLater: (id) => console.log(`Saved item ${id} for later`),
      deleteItem: (id) => console.log(`Deleted item ${id}`),
    },
    {
      id: 2,
      name: "Jeans",
      price: 49.99,
      image: "https://via.placeholder.com/64", // Replace with a real image URL
      stock: true,
      sizes: ["30", "32", "34"],
      size: "32", // Default size
      quantity: 1,
      incrementQuantity: (id) => console.log(`Incremented quantity for item ${id}`),
      decrementQuantity: (id) => console.log(`Decremented quantity for item ${id}`),
      saveForLater: (id) => console.log(`Saved item ${id} for later`),
      deleteItem: (id) => console.log(`Deleted item ${id}`),
    },
    {
      id: 3,
      name: "Sneakers",
      price: 69.99,
      image: "https://via.placeholder.com/64", // Replace with a real image URL
      stock: false,
      sizes: ["8", "9", "10"],
      size: "9", // Default size
      quantity: 1,
      incrementQuantity: (id) => console.log(`Incremented quantity for item ${id}`),
      decrementQuantity: (id) => console.log(`Decremented quantity for item ${id}`),
      saveForLater: (id) => console.log(`Saved item ${id} for later`),
      deleteItem: (id) => console.log(`Deleted item ${id}`),
    },
    {
      id: 4,
      name: "Baseball Cap",
      price: 15.99,
      image: "https://via.placeholder.com/64", // Replace with a real image URL
      stock: true,
      sizes: ["One Size"],
      size: "One Size", // Default size
      quantity: 3,
      incrementQuantity: (id) => console.log(`Incremented quantity for item ${id}`),
      decrementQuantity: (id) => console.log(`Decremented quantity for item ${id}`),
      saveForLater: (id) => console.log(`Saved item ${id} for later`),
      deleteItem: (id) => console.log(`Deleted item ${id}`),
    },
  ];

  const dummyData = {
    subtotal: 80.96,
    discount: 20,      // in percentage
    deliveryFee: 0.0,  // Free delivery
    tax: 14.0,         // Fixed tax amount
    total: 78.76       // Final total after discount and tax
  };
  
  // Usage example
  // <CartItems cartItems={dummyCartItems} loading={false} />
  
  return (
    <div>
        <Navbar />
        <div className='w-full flex justify-center items-start gap-4 my-auto p-4'>
          <CartItems cartItems={dummyCartItems} loading={false} />
          <CartSummary subtotal={dummyData.subtotal}
                      discount={dummyData.discount}
                      deliveryFee={dummyData.deliveryFee}
                      tax={dummyData.tax}
                      total={dummyData.total}
                      loading={false} />
        </div>
    </div>
  )
}

export default Cart
