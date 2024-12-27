import React, { useState, useEffect } from "react";
import {
  FunnelIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";

const StockFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [isStockModalOpen, setStockModalOpen] = useState(false);

  const navigate = useNavigate();
  const categories = [
    "Electronics",
    "Fashion & Apparel",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Books, Media & Music",
    "Grocery & Gourmet",
    "Sports & Fitness",
    "Automotive",
    "Travel & Tourism",
    "Health & Medical"
  ];

  const categorySubcategories = {
    "Electronics": [
      "Computers & Laptops",
      "Mobile Phones & Tablets",
      "Gaming & Consoles",
      "Audio & Video",
      "Smart Home Devices",
      "Cameras & Drones",
      "Wearable Technology",
    ],
    "Fashion & Apparel": [
      "Women's Clothing",
      "Men's Clothing",
      "Kids' Clothing",
      "Footwear",
      "Accessories (bags, hats, jewelry, etc.)",
      "Lingerie",
      "Sportswear",
    ],
    "Home & Kitchen": [
      "Furniture",
      "Home Decor",
      "Kitchen Appliances",
      "Bedding & Bath",
      "Home Improvement Tools",
      "Garden & Outdoor",
    ],
    "Beauty & Personal Care": [
      "Skincare",
      "Haircare",
      "Makeup",
      "Fragrances",
      "Personal Hygiene",
    ],
    "Books, Media & Music": [
      "Books",
      "Movies & TV Shows",
      "Music",
      "Games & Toys",
    ],
    "Grocery & Gourmet": [
      "Fresh Produce",
      "Frozen Foods",
      "Canned & Packaged Foods",
      "Beverages",
      "Snacks & Sweets",
      "International Foods",
    ],
    "Sports & Fitness": [
      "Sports Equipment",
      "Fitness Equipment",
      "Sports Apparel",
      "Outdoor Gear",
    ],
    "Automotive": [
      "Car Accessories",
      "Bike Accessories",
      "Car Parts",
      "Bike Parts",
    ],
    "Travel & Tourism": [
      "Flight Tickets",
      "Hotel Bookings",
      "Holiday Packages",
      "Travel Insurance",
      "Visa & Passport Services",
    ],
    "Health & Medical": [
      "Medical Devices",
      "Health Supplements",
      "Ayurvedic Products",
      "Home Healthcare",
    ],
  };

  const stocks = ["in stock", "out of stock", "selling fast", "only few left"];

  const [searchParams, setSearchParams] = useSearchParams();

  // Update query parameters while preserving existing ones
  const updateQueryParams = () => {
    const params = new URLSearchParams(searchParams);

    // Category filter
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    } else {
      params.delete("category");
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      params.set("subcategory", selectedSubcategories.join(","));
    } else {
      params.delete("subcategory");
    }

    // Stock filter
    if (selectedStocks.length > 0) {
      params.set("stock", selectedStocks.join(","));
    } else {
      params.delete("stock");
    }

    setSearchParams(params);
  };

  // Toggle selected categories
  const toggleCategory = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  // Toggle selected subcategories
  const toggleSubcategory = (subcategory) => {
    const updatedSubcategories = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter((s) => s !== subcategory)
      : [...selectedSubcategories, subcategory];
    setSelectedSubcategories(updatedSubcategories);
  };

  // Toggle selected stock statuses
  const toggleStock = (stock) => {
    const updatedStocks = selectedStocks.includes(stock)
      ? selectedStocks.filter((s) => s !== stock)
      : [...selectedStocks, stock];
    setSelectedStocks(updatedStocks);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedStocks([]);
    navigate("/admin/dashboard/product-stock"); // Reset to the base URL without query params
  };

  useEffect(() => {
    // When query params change, update the state values accordingly
    const categoryParam = searchParams.get("category");
    const subcategoryParam = searchParams.get("subcategory");
    const stockParam = searchParams.get("stock");

    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    }

    if (subcategoryParam) {
      setSelectedSubcategories(subcategoryParam.split(","));
    }

    if (stockParam) {
      setSelectedStocks(stockParam.split(","));
    }
  }, [searchParams]);

  // Determine available subcategories based on selected categories
  const availableSubcategories = selectedCategories.length > 0
    ? selectedCategories.reduce((acc, category) => {
        acc = [...acc, ...categorySubcategories[category]];
        return acc;
      }, [])
    : [];

  return (
    <div className="w-2/3 bg-white mx-4 relative rounded-lg shadow-md mt-4">
      <div className="flex items-center">
        {/* Filter By Section */}
        <div className="w-1/5 flex justify-center items-center py-4 px-4 border-r-2 border-gray-300">
          <FunnelIcon className="h-5 w-5 text-gray-600" />
          <span className="ml-2 text-gray-800 font-medium">Filter By</span>
        </div>

        {/* Category Filter */}
        <div className="w-1/5 flex flex-col justify-between items-center py-4 px-4 border-gray-300 border-r-2 relative">
          <button
            className="flex items-center text-gray-700 text-sm focus:outline-none"
            onClick={() => setCategoryModalOpen((prev) => !prev)}
          >
            Category
            {isCategoryModalOpen ? (
              <ChevronUpIcon className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            )}
          </button>
          {isCategoryModalOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Select Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-xs rounded-md border ${
                      selectedCategories.includes(category)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-md shadow hover:bg-blue-600"
                onClick={() => {
                  setCategoryModalOpen(false);
                  updateQueryParams();
                }}
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        {/* Subcategory Filter */}
        <div className="w-1/5 flex flex-col justify-between items-center py-4 px-4 border-gray-300 border-r-2 relative">
          <button
            className="flex items-center text-gray-700 text-sm focus:outline-none"
            onClick={() => setSubcategoryModalOpen((prev) => !prev)}
            disabled={selectedCategories.length === 0} // Disable button if no category is selected
          >
            Subcategory
            {isSubcategoryModalOpen ? (
              <ChevronUpIcon className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            )}
          </button>
          {/* Show note only when subcategory modal is toggled and no categories are selected */}
          {(isSubcategoryModalOpen && selectedCategories.length === 0)&& (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
              <p className="text-sm text-gray-600">
                Please select a category to view subcategories.
              </p>
            </div>
          )}
          {/* Subcategory modal */}
          {isSubcategoryModalOpen && selectedCategories.length > 0 && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Select Subcategory
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableSubcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    className={`px-3 py-1 text-xs rounded-md border ${
                      selectedSubcategories.includes(subcategory)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                    onClick={() => toggleSubcategory(subcategory)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-md shadow hover:bg-blue-600"
                onClick={() => {
                  setSubcategoryModalOpen(false);
                  updateQueryParams();
                }}
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        {/* Stock Filter */}
        <div className="w-1/5 flex flex-col justify-between items-center py-4 px-4 border-gray-300 border-r-2 relative">
          <button
            className="flex items-center text-gray-700 text-sm focus:outline-none"
            onClick={() => setStockModalOpen((prev) => !prev)}
          >
            Stock
            {isStockModalOpen ? (
              <ChevronUpIcon className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            )}
          </button>
          {isStockModalOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Select Stock Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {stocks.map((stock) => (
                  <button
                    key={stock}
                    className={`px-3 py-1 text-xs rounded-md border ${
                      selectedStocks.includes(stock)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                    onClick={() => toggleStock(stock)}
                  >
                    {stock}
                  </button>
                ))}
              </div>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-md shadow hover:bg-blue-600"
                onClick={() => {
                  setStockModalOpen(false);
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

export default StockFilter;
