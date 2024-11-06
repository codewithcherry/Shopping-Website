import React from 'react'
import ShippingAddressForm from '../components/Cart/ShippingAddressForm'
import Navbar from '../components/Navigation/Navbar'
import AddressList from '../components/Cart/AddressList'
import BreadCrumbs from '../components/Navigation/BreadCrumbs'
import CheckoutPayment from '../components/Cart/CheckoutPayment'

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
        { label: 'Checkout', link: '/checkout' },
      ];

  return (
    <div className='bg-gray-100 w-full h-auto'>
      <Navbar />
      <div className='p-6'>
        <BreadCrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className='flex lg:flex md:flex  w-[80%] mx-auto justify-between gap-6'>
        <AddressList addresses={addresses} />
        <CheckoutPayment />
      </div>
    </div>
  )
}

export default Checkout
