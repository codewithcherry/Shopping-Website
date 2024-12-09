import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-10 ">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
    {/* MyShop Section */}
    <div className="col-span-2 space-y-4">
      <h4 className="text-xl font-bold">MyShop</h4>
      <p>Subscribe and get 10% off your first order.</p>
      <div className="flex mt-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-l-md outline-none text-gray-800"
        />
        <button className="bg-indigo-800 px-4 py-2 rounded-r-md hover:bg-indigo-500">
          <EnvelopeIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>

    {/* Support Section */}
    <div className="space-y-4">
      <h4 className="text-xl font-bold">Support</h4>
      <p className="flex items-center">
        <MapPinIcon className="h-5 w-5 mr-2" />
        123 Main Street, New York, USA
      </p>
      <p className="flex items-center">
        <EnvelopeIcon className="h-5 w-5 mr-2" />
        support@myshop.com
      </p>
      <p className="flex items-center">
        <PhoneIcon className="h-5 w-5 mr-2" />
        +1-234-567-890
      </p>
    </div>

    {/* Account Section */}
    <div className="space-y-4">
      <h4 className="text-xl font-bold">Account</h4>
      <ul>
        <li>
          <Link to="/account" className="hover:underline">
            My Account
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">
            Login / Register
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:underline">
            Cart
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="hover:underline">
            Wishlist
          </Link>
        </li>
        <li>
          <Link to="/" className="hover:underline">
            Shop
          </Link>
        </li>
      </ul>
    </div>

    {/* Quick Links Section */}
    <div className="space-y-4">
      <h4 className="text-xl font-bold">Quick Links</h4>
      <ul>
        <li>
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/terms" className="hover:underline">
            Terms of return/exchange
          </Link>
        </li>
        <li>
          <Link to="/faq" className="hover:underline">
            FAQ
          </Link>
        </li>
        <li>
          <Link to="/contact-us" className="hover:underline">
            Contact Us
          </Link>
        </li>
      </ul>
    </div>

    
  </div>

  {/* Social Media and Download Section */}
  <div className="grid grid-cols-1 md:flex space-x-10 md:justify-around items-center  py-4 ">
      <div>
        <div className=''>
            <h4 className="text-xl font-bold">Download Our App</h4>
            <p>Save $3 with new app user only.</p>
        </div>
        <div className="flex justify-center ">
            <img src="https://download.logo.wine/logo/Google_Play/Google_Play-Logo.wine.png" alt="Google Play" className="h24 w-32 " />
            <img src="https://www.logo.wine/a/logo/App_Store_(iOS)/App_Store_(iOS)-Badge-Logo.wine.svg" alt="App Store" className="h24 w-32" />
        </div>
      </div>
      <div className="flex space-x-2 md:space-x-10 items-center mt-2">
        <h1 className='text-2xl font-semibold'>Follow us at</h1>
        <FaFacebook className="h-6 w-6 hover:text-indigo-300" />
        <FaTwitter className="h-6 w-6 hover:text-indigo-300" />
        <FaInstagram className="h-6 w-6 hover:text-indigo-300" />
        <FaLinkedin className="h-6 w-6 hover:text-indigo-300" />
      </div>
    </div>

  {/* Footer Bottom */}
  <div className="text-center text-sm text-indigo-200  border-t border-slate-400 p-2">
    © {new Date().getFullYear()} MyShop. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
