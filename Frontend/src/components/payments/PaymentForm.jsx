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

const PaymentForm = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Details:', formData);
    alert('Order placed successfully!');
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Choose Payment Method</h2>

      <div className="space-y-4">
        {/* Payment Options */}
        {[
          { label: 'Debit/Credit Card', icon: <CreditCardIcon className="h-6 w-6" /> },
          { label: 'NetBanking', icon: <BuildingLibraryIcon className="h-6 w-6" /> },
          { label: 'UPI', icon: <QrCodeIcon className="h-6 w-6" /> },
          { label: 'Wallet', icon: <WalletIcon className="h-6 w-6" /> },
          { label: 'COD', icon: <BanknotesIcon className="h-6 w-6" /> },
        ].map(({ label, icon }) => (
          <div key={label}>
            <button
              onClick={() => handleOptionChange(label)}
              className={`flex items-center w-full px-4 py-3 text-left font-medium border rounded-md transition-all duration-300 ${
                selectedOption === label ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-gray-50 border-gray-300'
              } focus:outline-none hover:bg-blue-100`}
            >
              <span className="text-blue-500 mr-3">{icon}</span>
              {label}
            </button>

            {selectedOption === label && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md animate-fadeIn">
                {/* Conditional Form Rendering Based on Selected Option */}
                {label === 'Debit/Credit Card' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      name="cardHolderName"
                      placeholder="Card Holder Name"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="Expiry Date (MM/YY)"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-blue-500"
                      />
                      <span className="text-sm text-gray-600">Save this card for future use</span>
                    </label>
                  </div>
                )}
                {label === 'NetBanking' && (
                  <div>
                    <h3 className="font-medium text-gray-700">Select Bank</h3>
                    <div className="space-y-2 mt-2">
                      {['HDFC', 'SBI', 'ICICI', 'Axis Bank', 'Kotak'].map((bank) => (
                        <label key={bank} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="netBankingBank"
                            value={bank}
                            checked={formData.netBankingBank === bank}
                            onChange={handleInputChange}
                            className="h-5 w-5 text-blue-500"
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
                    className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
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
                      className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-600 mt-2">Enter your registered phone number for wallet payment.</p>
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
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none transition-all duration-300"
      >
        Place Order
      </button>

      {/* Secure Payment Notes */}
      <div className="mt-8 border-t pt-6 text-center space-y-4">
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
          <LockClosedIcon className="h-8 w-8 text-gray-400" title="Secure SSL" />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
