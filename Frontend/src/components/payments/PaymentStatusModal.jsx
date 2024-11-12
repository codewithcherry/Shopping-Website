import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  XMarkIcon,
  CheckBadgeIcon,
  ClockIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/solid';

const PaymentStatusModal = ({ 
  isOpen, 
  onClose, 
  orderStatus, 
  transactionType, 
  paymentMode, 
  transactionDetails, 
  orderId,
  shippingDetails, 
  shippingAddress, 
  orderValue,
  items 
}) => {
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [isItemsExpanded, setIsItemsExpanded] = useState(false);

  if (!isOpen) return null;

  const statusIcons = {
    processing: <ArrowPathIcon className="h-14 w-14 animate-pulse text-yellow-500" />,
    successful: <CheckBadgeIcon className="h-14 w-14 animate-pulse text-green-500" />,
    pending: <ClockIcon className="h-14 w-14 animate-pulse text-blue-500" />,
    cancelled: <XMarkIcon className="h-14 w-14 animate-pulse text-red-500" />
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8 relative">
        {/* Close Button
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button> */}

        {/* Order Status Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-2">{statusIcons[orderStatus]}</div>
          <h2 className="text-xl font-bold text-gray-800 capitalize">{orderStatus}</h2>
        </div>

        {/* Transaction & Order Details in Flex */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6 border-t border-b border-gray-200 py-4">
          {/* Transaction Info */}
          <div className="md:w-1/2">
            <h3 className="text-gray-800 font-semibold mb-2">Transaction Details</h3>
            <p className="text-gray-600 font-semibold">Transaction Type: {transactionType}</p>
            {transactionType === 'prepaid' && (
              <p className="text-gray-600">Payment Mode: {paymentMode}</p>
            )}
            <p className="text-gray-600">UTR: {transactionDetails.UTR}</p>
            <p className="text-gray-600">Transaction ID: {transactionDetails.transactionId}</p>
          </div>

          {/* Order Details */}
          <div className="md:w-1/2">
            <h3 className="text-gray-800 font-semibold mb-2">Order Details</h3>
            <p className="text-gray-600 font-semibold">Order ID: {orderId}</p>
            <p className="text-gray-600 font-semibold">Shipping Status: {shippingDetails.status || 'Yet to Dispatch'}</p>
            <p className="text-gray-600">Tracking ID: {shippingDetails.trackingId || 'N/A'}</p>
          </div>
        </div>

        {/* Shipping Address with Expandable Toggle */}
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsAddressExpanded(!isAddressExpanded)}
          >
            <h3 className="text-gray-800 font-semibold">Shipping Address:</h3>
            {isAddressExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            )}
          </div>
          <div className={`text-gray-600 ${isAddressExpanded ? 'mt-2' : 'truncate'}`}>
          {isAddressExpanded && (
              <>
                <p>{shippingAddress.fullName}</p>
                <p>{shippingAddress.doorNumber}, {shippingAddress.streetArea}</p>
                <p>{shippingAddress.landmark}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.postalCode}</p>
                <p>Phone: {shippingAddress.phoneNumber}</p>
              </>
            )}
          </div>
        </div>

        {/* Order Summary with Expandable Items Section */}
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsItemsExpanded(!isItemsExpanded)}
          >
            <h3 className="text-gray-800 font-semibold">Items:</h3>
            {isItemsExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            )}
          </div>
          <div className={`grid grid-cols-2 gap-4 ${isItemsExpanded ? 'mt-2' : 'hidden'}`}>
            {items.map((item, index) => (
              <div key={index} className="flex items-center mb-3 p-2 border border-gray-200 rounded-lg shadow-sm">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded mr-3 border border-gray-200 shadow-sm" />
                <div>
                  <p className="text-gray-800 font-medium">{item.title}</p>
                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Value */}
        <div className="mb-6">
          <p className="text-gray-800 font-semibold">Order Value: <span className="text-blue-600">${orderValue}</span></p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <Link
            to="/shop"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded hover:bg-blue-200 transition duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600 transition duration-200"
          >
            Go to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatusModal;
