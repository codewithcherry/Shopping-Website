import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import AddressList from '../components/Cart/AddressList';
import BreadCrumbs from '../components/Navigation/BreadCrumbs';
import CheckoutPayment from '../components/Cart/CheckoutPayment';

const Checkout = () => {
  const addresses = [
    {
      fullName: 'John Doe',
      mobileNumber: '1234567890',
      doorNumber: '123',
      streetArea: 'Main Street',
      landmark: 'Near Central Park',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      phoneNumber: '0987654321'
    },
    {
      fullName: 'Jane Smith',
      mobileNumber: '0987654321',
      doorNumber: '456',
      streetArea: 'Broadway Ave',
      landmark: 'Opposite Mall',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      phoneNumber: '1234567890'
    }
  ];

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Products', link: '/products' },
    { label: 'Cart', link: '/cart' },
    { label: 'Checkout', link: '/checkout' }
  ];

  return (
    <div className="bg-gray-100 w-full h-auto">
      {/* Navbar */}
      <Navbar />
      
      <div className="p-8">
        {/* Breadcrumbs */}
        <BreadCrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Checkout Layout */}
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-8 px-6 ">
        {/* Left Section - Address List */}
        <div className="lg:w-3/5 p-6 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
          <AddressList addresses={addresses} />
          {/* Uncomment if Shipping Address Form is needed */}
          {/* <ShippingAddressForm /> */}
        </div>

        {/* Right Section - Payment */}
        <div className="lg:w-2/5 p-6 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>
          <CheckoutPayment />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
