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
import Loading from '../Alert/Loading';

const PaymentStatusModal = ({ isOpen, onClose, orderData ,modalLoading}) => {
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [isItemsExpanded, setIsItemsExpanded] = useState(false);

  if (!isOpen) return null;

  const {
    _id,
    deliveryStatus,
    orderStatus,
    transactionDetails,
    paymentType,
    paymentMode,
    shippingAddress,
    products,
    estimatedDeliveryDate,
    orderDate
  } = orderData;

  const statusIcons = {
    processing: <ArrowPathIcon className="h-14 w-14 text-yellow-500 animate-pulse" />,
    successfull: <CheckBadgeIcon className="h-14 w-14 text-green-500 animate-pulse" />,
    pending: <ClockIcon className="h-14 w-14 text-blue-500 animate-pulse" />,
    cancelled: <XMarkIcon className="h-14 w-14 text-red-500 animate-pulse" />
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      {modalLoading?<Loading />:
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
        
        {/* Close Button
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button> */}

        {/* Header - Order Status and Icon */}
        <div className="flex flex-col items-center mb-4">
          
          <div className="mb-2">{statusIcons[orderStatus.toLowerCase()]}</div>
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{orderStatus}</h2>
          <p className="text-gray-600 text-sm">Order ID: {_id}</p>
        </div>

        {/* Transaction and Order Summary */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6 border-t border-b border-gray-200 py-4">
          {/* Transaction Info */}
          <div className="md:w-1/2">
            <h3 className="text-gray-800 font-semibold mb-2">Transaction Details</h3>
            <p className="text-gray-600">Type: {paymentType}</p>
            {paymentType === 'Prepaid' && <p className="text-gray-600">Mode: {paymentMode}</p>}
            <p className="text-gray-600">UTR: {transactionDetails.utr || 'N/A'}</p>
            <p className="text-gray-600">TRID: {transactionDetails.transactionId|| 'N/A'}</p>
            <p className="text-gray-600">Time: {new Date(transactionDetails.transactionDate).toLocaleString()}</p>
          </div>

          {/* Order Details */}
          <div className="md:w-1/2">
            <h3 className="text-gray-800 font-semibold mb-2">Order Details</h3>
            <p className="text-gray-600">delivery status: {deliveryStatus}</p>
            <p className="text-gray-600">Estimated Delivery: {new Date(estimatedDeliveryDate).toLocaleDateString()}</p>
            <p className="text-gray-600">Order date: {new Date(orderDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsAddressExpanded(!isAddressExpanded)}
          >
            <h3 className="text-gray-800 font-semibold">Shipping Details</h3>
            {isAddressExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            )}
          </div>
          {isAddressExpanded && (
            <div className="text-gray-600 mt-2">
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.doorNumber}, {shippingAddress.streetArea}</p>
              <p>{shippingAddress.landmark}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.postalCode}</p>
              <p>Phone: {shippingAddress.phoneNumber}</p>
            </div>
          )}
        </div>

        {/* Order Items Section */}
        <div className="border-t border-b border-gray-200 py-2 mb-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsItemsExpanded(!isItemsExpanded)}
          >
            <h3 className="text-gray-800 font-semibold">Items Details</h3>
            {isItemsExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            )}
          </div>
          {isItemsExpanded && (<div>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {products.map((item, index) => (
                <li key={index}>{item.title}</li>
              ))}
            </ul>
            <p  className='text-sm text-red-500 text-center p-2'>For more details goto orders page</p>
            </div>
          )}
        </div>

        {/* Total Order Value */}
        <div className="mb-6 text-center">
          <p className="text-gray-800 font-semibold text-lg">Total Order Value: 
            <span className="text-blue-600 ml-1">${transactionDetails.amount.toFixed(2)}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Link
            to="/products"
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
            View Orders
          </Link>
        </div>
      </div>
      }
    </div>
  );
};

export default PaymentStatusModal;
