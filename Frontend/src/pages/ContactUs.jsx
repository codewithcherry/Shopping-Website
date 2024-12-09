// ContactUs.js
import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navigation/Navbar';

const ContactUs = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-6">
        {/* Left Section */}
        <div className="flex-1 text-left md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl font-semibold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Email, call, or complete the form to learn how Snappy can solve your messaging problem.
          </p>
          <p className="mt-2 text-lg text-gray-600">
            <strong>Email:</strong> info@snappy.io
          </p>
          <p className="text-lg text-gray-600">
            <strong>Phone:</strong> 321-221-231
          </p>
          <a href="#" className="text-blue-500 mt-4 inline-block">
            Customer Support
          </a>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="mt-2 text-gray-600 font-semibold">Customer Support</p>
              <p className="text-gray-600">
                For media-related questions or press inquiries, please contact us at <strong>media@snappy.com</strong>.
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Feedback and Suggestions</p>
              <p className="text-gray-600">We value your feedback and are continuously working to improve Snappy.</p>
            </div>
            <div>
              <p className="mt-2 text-gray-600 font-semibold">Media Inquiries</p>
              <p className="text-gray-600">
                For media-related questions or press inquiries, please contact us at <strong>media@snappy.com</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className=" mt-8 md:mt-0 md:ml-8 bg-white p-8 rounded-lg shadow-lg max-w-xl">
          <h3 className="text-2xl font-semibold text-gray-900">Get in Touch</h3>
          <p className="mt-2 text-gray-600">You can reach us anytime</p>
          <form className="mt-4 space-y-4 mx-w-lg">
           <div className='grid grid-cols-2 gap-4'>
           <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
           </div>
            <div>
              <textarea
                name="message"
                rows="4"
                placeholder="How can we help?"
                className="w-full p-3 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600"
            >
              Submit
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-600">
            By contacting us, you agree to our{' '}
            <a href="#" className="text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-500">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
