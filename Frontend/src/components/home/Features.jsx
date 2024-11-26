import React from "react";
import { TruckIcon, LifebuoyIcon, ArrowPathIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

const Features = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 space-y-8 md:flex-row md:space-y-0 md:space-x-8">
      {/* Free and Fast Delivery */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-gray-100 rounded-full">
          <TruckIcon className="w-10 h-10 text-gray-700" />
        </div>
        <h3 className="text-lg font-semibold">FREE AND FAST DELIVERY</h3>
        <p className="text-gray-500">Free delivery for all orders over $199</p>
      </div>

      {/* 24/7 Customer Service */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-gray-100 rounded-full">
          <LifebuoyIcon className="w-10 h-10 text-gray-700" />
        </div>
        <h3 className="text-lg font-semibold">24/7 CUSTOMER SERVICE</h3>
        <p className="text-gray-500">Friendly 24/7 customer support</p>
      </div>

      {/* Money Back Guarantee */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-gray-100 rounded-full">
          <ArrowPathIcon className="w-10 h-10 text-gray-700" />
        </div>
        <h3 className="text-lg font-semibold">15-DAYS RETURN/EXCHANGE</h3>
        <p className="text-gray-500">We accept return/exchange within 15 days</p>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600 transition duration-300"
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Features;
