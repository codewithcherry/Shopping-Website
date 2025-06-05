import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import OrderProductCard from './OrderProductCard';
import axios from 'axios';

const baseURL=import.meta.env.VITE_API_BACKEND;


const OrderCard = ({ order }) => {
  const [isTransactionOpen, setTransactionOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isShippingOpen, setShippingOpen] = useState(false);
  const [isProductsOpen, setProductsOpen] = useState(false);

  const downloadInvoice = async (orderId) => {
    const token = localStorage.getItem("jwtToken");
    
    try {
      const response = await axios.post(
        baseURL+'/orders/generate-invoice',
        { orderId },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          responseType: 'blob'  // This is important to receive the PDF as binary data
        }
      );
      
      // Check if response contains data
      if (!response.data || response.data.size === 0) {
        throw new Error('Failed to generate invoice: Empty response data');
      }
  
      // Create a URL for the blob
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Create a link element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${orderId}.pdf`; // Custom filename
      document.body.appendChild(link);
      link.click();
  
      // Clean up the URL and remove link element
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      // Show user-friendly error messages
      console.error('Error downloading invoice:', err);
      alert(`Failed to download invoice. Error: ${err.message || err}`);
    }
  };

  return (
    <div className="max-w-full sm:max-w-md md:max-w-2xl lg:max-w-7xl p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow-lg space-y-4 md:space-y-6">
      {/* Order ID and Status */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
        <p  className='text-sm py-2'>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
        </div>
        <button className="p-2 bg-indigo-600 text-white text-sm font-medium rounded-2xl hover:bg-indigo-700 transition-colors" onClick={()=>downloadInvoice(order._id)}>
          Download Invoice
        </button>
      </div>
    
        <div className='flex justify-between'>
            <p className='text-sm font-medium text-gray-600'>Delivery Status: <span className='text-green-600 font-mono'>{order.deliveryStatus}</span></p>
            <p className='text-sm font-medium text-gray-600'>Estimated Delivery: <span className='text-blue-600 font-mono'> {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</span></p>
        </div>

      {/* Product List */}
      <div>
        <ol className="space-y-2 text-gray-600">
          {order.products.map((item, index) => (
            <li className="flex justify-between" key={index}>
              <p>{`${item.title} x ${item.quantity} qty`}</p>
              <p>{`Size: ${item.size}`}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Product Cards Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mx-auto mt-4">
        {order.products.map((item, index) => (
          <OrderProductCard key={index} product={item.productId} />
        ))}
      </div>

      {/* Transaction, Payment, Shipping, Delivery Sections */}
      <div className="flex flex-wrap justify-between gap-4">
        {/* Transaction Details */}
        <div className="lg:w-1/4 w-full">
          <button
            className="flex justify-between w-full items-center font-semibold text-gray-700"
            onClick={() => setTransactionOpen(!isTransactionOpen)}
          >
            Transaction Details
            <ChevronDownIcon
              className={`h-5 w-5 transform transition-transform ${
                isTransactionOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          {isTransactionOpen && (
            <div className="mt-2 pl-4 space-y-1 text-gray-600">
              <p>Amount: ₹{order.transactionDetails.amount}</p>
              <p>Transaction ID: {order.transactionDetails.transactionId}</p>
              <p>Transaction Date: {new Date(order.transactionDetails.transactionDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Payment Details */}
        <div className="lg:w-1/4 w-full">
          <button
            className="flex justify-between w-full items-center font-semibold text-gray-700"
            onClick={() => setPaymentOpen(!isPaymentOpen)}
          >
            Payment Details
            <ChevronDownIcon
              className={`h-5 w-5 transform transition-transform ${
                isPaymentOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          {isPaymentOpen && (
            <div className="mt-2 pl-4 space-y-1 text-gray-600">
              <p>Payment Type: {order.paymentType}</p>
              <p>Payment Mode: {order.paymentMode}</p>
              <p>Card Holder: {order.paymentDetails.cardHolderName}</p>
              <p>Card Number: {order.paymentDetails.maskedCardNumber}</p>
            </div>
          )}
        </div>

        {/* Shipping Address */}
        <div className="lg:w-1/4 w-full">
          <button
            className="flex justify-between w-full items-center font-semibold text-gray-700"
            onClick={() => setShippingOpen(!isShippingOpen)}
          >
            Shipping Address
            <ChevronDownIcon
              className={`h-5 w-5 transform transition-transform ${
                isShippingOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          {isShippingOpen && (
            <div className="mt-2 pl-4 space-y-1 text-gray-600">
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.doorNumber}, {order.shippingAddress.streetArea}</p>
              <p>{order.shippingAddress.landmark}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
              </p>
              <p>Phone: {order.shippingAddress.phoneNumber}</p>
            </div>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default OrderCard;
