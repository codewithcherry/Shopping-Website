import React, { useState } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  QrCodeIcon,
  WalletIcon,
  BuildingLibraryIcon,
  ShieldCheckIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios'

const PaymentForm = ({cartItems,address,modalOpen,handleOrderData}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
    netBankingBank: '',
    upiId: '',
    walletPhone: '',
  });
  // Calculate the subtotal, delivery fee, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.productId.finalPrice * item.quantity, 0);
  const deliveryFee = subtotal < 199 ? 25 : 0; // Example static delivery fee
  const total = subtotal + deliveryFee;

  // Handle selection of payment option
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFormData({
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cvv: '',
      saveCard: false,
      netBankingBank: '',
      upiId: '',
      walletPhone: '',
    });
  };

  // Handle input change for payment details
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data={
      shippingAddress:address,
      paymentType:selectedOption=="COD"?"COD":"Prepaid",
      paymentMode:selectedOption,
      paymentDetails:formData,
      products:cartItems.map(item => ({
        productId: item.productId._id,
        title:item.productId.title,
        quantity: item.quantity,
        size: item.size
      })),
      amount:total
    }
    // console.log(data)
    const token=localStorage.getItem("jwtToken")
        try {
          
          const response = await axios.post(
              'http://localhost:3000/orders/place-order', // Replace with your actual API endpoint
              data,
              {
                  headers: {
                      Authorization: `Bearer ${token}`, // Add authorization token in header
                      'Content-Type': 'application/json',
                  },                 
              }
          );  
          await handleOrderData(response.data.order) 
          console.log('order placed successfully:', response.data);
          
      }
      catch(err){
          console.log(err)
      }
    modalOpen()
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg space-y-4">
      <h2 className="text-lg font-semibold text-center mb-2">Choose Payment Method</h2>

      <div className="space-y-2">
        {/* Payment Options */}
        {[
          { label: 'Credit/Debit', icon: <CreditCardIcon className="h-4 w-4" /> },
          { label: 'Internet Banking', icon: <BuildingLibraryIcon className="h-4 w-4" /> },
          { label: 'UPI', icon: <QrCodeIcon className="h-4 w-4" /> },
          { label: 'Wallet', icon: <WalletIcon className="h-4 w-4" /> },
          { label: 'COD', icon: <BanknotesIcon className="h-4 w-4" /> },
        ].map(({ label, icon }) => (
          <div key={label}>
            <button
              onClick={() => handleOptionChange(label)}
              className={`flex items-center w-full px-4 py-2 text-sm text-left font-medium border rounded-md transition-all duration-300 ${
                selectedOption === label ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-gray-50 border-gray-300'
              } focus:outline-none hover:bg-blue-100`}
            >
              <span className="text-blue-500 mr-3">{icon}</span>
              {label}
            </button>

            {selectedOption === label && (
              <div className="mt-2 p-2 border border-gray-200 rounded-md animate-fadeIn">
                {/* Conditional Form Rendering Based on Selected Option */}
                {label === 'Credit/Debit' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="text"
                      name="cardHolderName"
                      placeholder="Card Holder Name"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="Expiry Date (MM/YY)"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                      />
                      <input
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleInputChange}
                        className="h-3 w-3 text-blue-500"
                      />
                      <span className="text-xs text-gray-600">Save this card for future use</span>
                    </label>
                  </div>
                )}
                {label === 'Internet Banking' && (
                  <div>
                    <h3 className=" text-sm font-medium text-gray-700">Select Bank</h3>
                    <div className="space-y-2 mt-2">
                      {['HDFC', 'SBI', 'ICICI', 'Axis Bank', 'Kotak'].map((bank) => (
                        <label key={bank} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="netBankingBank"
                            value={bank}
                            checked={formData.netBankingBank === bank}
                            onChange={handleInputChange}
                            className="h-3 w-3 text-blue-500"
                          />
                          <span>{bank}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {label === 'UPI' && (
                  <input
                    type="text"
                    name="upiId"
                    placeholder="UPI ID"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                )}
                {label === 'Wallet' && (
                  <div>
                    <input
                      type="text"
                      name="walletPhone"
                      placeholder="Phone Number"
                      value={formData.walletPhone}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-600 mt-2">Enter your registered phone number for wallet payment.</p>
                  </div>
                )}
                {label === 'COD' && (
                  <p className="text-sm text-gray-600">Cash will be collected upon delivery.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none transition-all duration-300"
      >
        Place Order
      </button>

      {/* Secure Payment Notes */}
      <div className="mt-6 border-t pt-6 text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <ShieldCheckIcon className="h-6 w-6" />
          <span className="font-semibold">Secure Payment Gateway</span>
        </div>
        <p className="text-sm text-gray-500">
          All transactions are secure and encrypted. We never store your card details.
        </p>
        <div className="flex items-center justify-center space-x-4 mt-4">
          {/* Icons representing trusted gateways */}
          <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8" />
          <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="h-8" />
          <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="h-8" />
          <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-8" />
          <LockClosedIcon className="h-6 w-6 text-indigo-600" title="Secure SSL" />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
