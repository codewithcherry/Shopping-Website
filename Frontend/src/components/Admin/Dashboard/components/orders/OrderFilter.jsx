import React, { useState, useEffect } from "react";
import {
  FunnelIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderFilter = ({ date }) => {
  const [selectedDate, setSelectedDate] = useState(date || null);
  const [isOrderTypeModalOpen, setOrderTypeModalOpen] = useState(false);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState([]);
  const [isOrderStatusModalOpen, setOrderStatusModalOpen] = useState(false);
  const [selectedOrderStatuses, setSelectedOrderStatuses] = useState([]);
  const navigate = useNavigate();
  const orderTypes = ["Prepaid", "COD"];
  const orderStatuses = ["successfull", "pending", "cancelled", "processing"];

  const [searchParams, setSearchParams] = useSearchParams();

  // Update query parameters while preserving existing ones
  const updateQueryParams = () => {
    const params = new URLSearchParams(searchParams);

    // Date handling (timezone issue)
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      params.set("date", formattedDate);
    } else {
      params.delete("date");
    }

    // Order Type filter
    if (selectedOrderTypes.length > 0) {
      params.set("orderType", selectedOrderTypes.join(","));
    } else {
      params.delete("orderType");
    }

    // Order Status filter
    if (selectedOrderStatuses.length > 0) {
      params.set("orderStatus", selectedOrderStatuses.join(","));
    } else {
      params.delete("orderStatus");
    }

    setSearchParams(params);
  };

  // Toggle selected order types
  const toggleOrderType = (type) => {
    const updatedTypes = selectedOrderTypes.includes(type)
      ? selectedOrderTypes.filter((t) => t !== type)
      : [...selectedOrderTypes, type];
    setSelectedOrderTypes(updatedTypes);
  };

  // Toggle selected order statuses
  const toggleOrderStatus = (status) => {
    const updatedStatuses = selectedOrderStatuses.includes(status)
      ? selectedOrderStatuses.filter((s) => s !== status)
      : [...selectedOrderStatuses, status];
    setSelectedOrderStatuses(updatedStatuses);
  };

  // Apply filters when selected date changes
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Ensure correct timezone adjustment for the date
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );

    const params = new URLSearchParams(searchParams);
    if (adjustedDate) {
      params.set("date", adjustedDate.toISOString().split("T")[0]);
    } else {
      params.delete("date");
    }

    // Update the URL with the new query params
    navigate(`?${params.toString()}`);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedDate(null);
    setSelectedOrderTypes([]);
    setSelectedOrderStatuses([]);
    navigate("/admin/dashboard/orders"); // Reset to the base URL without query params
  };

  useEffect(() => {
    // When query params change, update the state values accordingly
    const dateParam = searchParams.get("date");
    const orderTypeParam = searchParams.get("orderType");
    const orderStatusParam = searchParams.get("orderStatus");

    if (dateParam) {
      setSelectedDate(new Date(dateParam));
    }

    if (orderTypeParam) {
      setSelectedOrderTypes(orderTypeParam.split(","));
    }

    if (orderStatusParam) {
      setSelectedOrderStatuses(orderStatusParam.split(","));
    }
  }, [searchParams]);

  return (
    <div className="w-2/3 bg-white mx-4 relative rounded-lg shadow-md mt-4">
      <div className="flex items-center">
        {/* Filter By Section */}
        <div className="w-1/5 flex justify-center items-center py-4 px-4 border-r-2 border-gray-300">
          <FunnelIcon className="h-5 w-5 text-gray-600" />
          <span className="ml-2 text-gray-800 font-medium">Filter By</span>
        </div>

        {/* Date Filter */}
        <div className="w-1/5 py-4 px-4 border-gray-300 border-r-2">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd MMM yyyy"
            className="appearance-none bg-transparent text-gray-700 text-sm focus:outline-none cursor-pointer"
            placeholderText="Date"
          />
        </div>

        {/* Order Type Filter */}
        <div className="w-1/5 flex flex-col justify-between items-center py-4 px-4 border-gray-300 border-r-2 relative">
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
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-md shadow hover:bg-blue-600"
                onClick={() => {
                  setOrderTypeModalOpen(false);
                  updateQueryParams();
                }}
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
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-md shadow hover:bg-blue-600"
                onClick={() => {
                  setOrderStatusModalOpen(false);
                  updateQueryParams();
                }}
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        {/* Reset Filter Button */}
        <div className="w-1/5 flex justify-between items-center py-4 px-4">
          <button
            className="flex items-center text-red-500 hover:text-red-600 text-sm font-medium"
            onClick={resetFilters}
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
