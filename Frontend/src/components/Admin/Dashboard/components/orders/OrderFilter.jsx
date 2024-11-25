import React, { useState } from "react";
import { FunnelIcon, ArrowPathIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderFilter = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOrderTypeModalOpen, setOrderTypeModalOpen] = useState(false);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState([]);
  const [isOrderStatusModalOpen, setOrderStatusModalOpen] = useState(false);
  const [selectedOrderStatuses, setSelectedOrderStatuses] = useState([]);

  const orderTypes = [
    "Health & Medicine",
    "Book & Stationary",
    "Services & Industry",
    "Fashion & Beauty",
    "Home & Living",
    "Electronics",
    "Mobile & Phone",
    "Accessories",
  ];

  const orderStatuses = ["Successful", "Pending", "Cancelled", "Processing"];

  const toggleOrderType = (type) => {
    if (selectedOrderTypes.includes(type)) {
      setSelectedOrderTypes((prev) => prev.filter((t) => t !== type));
    } else {
      setSelectedOrderTypes((prev) => [...prev, type]);
    }
  };

  const toggleOrderStatus = (status) => {
    if (selectedOrderStatuses.includes(status)) {
      setSelectedOrderStatuses((prev) => prev.filter((s) => s !== status));
    } else {
      setSelectedOrderStatuses((prev) => [...prev, status]);
    }
  };

  const applyOrderTypeFilter = () => {
    setOrderTypeModalOpen(false);
  };

  const applyOrderStatusFilter = () => {
    setOrderStatusModalOpen(false);
  };

  return (
    <div className="w-2/3 bg-white mx-4  relative rounded-lg shadow-md mt-4">
      <div className="flex  items-center">
        {/* Filter By Section */}
        <div className="w-1/5 flex justify-center items-center py-4 px-4 border-r-2 border-gray-300">
          <FunnelIcon className="h-5 w-5 text-gray-600" />
          <span className="ml-2 text-gray-800 font-medium">Filter By</span>
        </div>

        {/* Date Filter */}
        <div className="w-1/5 py-4 px-4 border-gray-300 border-r-2 ">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd MMM yyyy"
            className="appearance-none bg-transparent text-gray-700 text-sm focus:outline-none cursor-pointer"
            placeholderText="Date"
          />
        </div>

        {/* Order Type Filter */}
        <div className="w-1/5 flex flex-col justify-between items-center py-4 px-4 border-gray-300 border-r-2  relative">
          <button
            className="flex items-center text-gray-700 text-sm focus:outline-none"
            onClick={() => setOrderTypeModalOpen((prev) => !prev)}
          >
            Order Type
            {isOrderTypeModalOpen ? (
              <ChevronUpIcon className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            )}
          </button>
          {isOrderTypeModalOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Select Order Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {orderTypes.map((type) => (
                  <button
                    key={type}
                    className={`px-3 py-1 text-xs rounded-md border ${
                      selectedOrderTypes.includes(type)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                    onClick={() => toggleOrderType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *You can choose multiple Order Types
              </p>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-md shadow hover:bg-blue-600"
                onClick={applyOrderTypeFilter}
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        {/* Order Status Filter */}
        <div className="w-1/5 flex flex-col justify-between items-center py-4 px-4 border-gray-300 border-r-2 relative">
          <button
            className="flex items-center text-gray-700 text-sm focus:outline-none"
            onClick={() => setOrderStatusModalOpen((prev) => !prev)}
          >
            Order Status
            {isOrderStatusModalOpen ? (
              <ChevronUpIcon className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            )}
          </button>
          {isOrderStatusModalOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Select Order Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {orderStatuses.map((status) => (
                  <button
                    key={status}
                    className={`px-3 py-1 text-xs rounded-md border ${
                      selectedOrderStatuses.includes(status)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                    onClick={() => toggleOrderStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *You can choose multiple Order Statuses
              </p>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-md shadow hover:bg-blue-600"
                onClick={applyOrderStatusFilter}
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
         {/* Reset Filter Button */}
      <div className=" w-1/5 flex  justify-between items-center py-4 px-4">
        <button
          className="flex items-center text-red-500 hover:text-red-600 text-sm font-medium"
          onClick={() => {
            setSelectedDate(null);
            setSelectedOrderTypes([]);
            setSelectedOrderStatuses([]);
          }}
        >
          <ArrowPathIcon className="h-5 w-5 mr-1" />
          Reset Filter
        </button>
      </div>
      </div>

     
    </div>
  );
};

export default OrderFilter;
