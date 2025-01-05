import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const categories = {
    Electronics: [
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
      "Health & Wellness",
    ],
    "Books, Media & Music": [
      "Books",
      "Movies & TV Shows",
      "Music",
      "Games & Toys",
      "Stationery & Office Supplies",
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
    Automotive: [
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

const ProductFilter = ({ setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: [],
    subCategory: [],
    gender: [],
    price: [0, 100000],
    sort: "price-asc",
  });
  const [expandedSections, setExpandedSections] = useState({
    category: false,
    subCategory: false,
    gender: true,
  });

  const handleToggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const updated = checked
        ? [...prevFilters[type], value]
        : prevFilters[type].filter((item) => item !== value);
      return { ...prevFilters, [type]: updated };
    });
  };

  const handleSliderChange = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, price: value }));
  };

  const handleSortChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, sort: e.target.value }));
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (key === "price") {
        params.set(key, value.join("-"));
      } else if (key === "sort" && value) {
        params.set(key, value);
      }
    });
    setPage(0);
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setFilters({ category: [], subCategory: [], gender: [], price: [0, 100000], sort: "price-asc" });
    setSearchParams({});
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6 h-screen overflow-y-auto">
      <h2 className="flex items-center gap-1 text-2xl font-bold text-gray-800 whitespace-nowrap">
        <FunnelIcon className="text-gray-800 w-6 h-6" />
        Product Filter
      </h2>

      {/* Sort By */}
      <div>
        <h3 className="font-medium text-gray-700">Sort By</h3>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleToggleSection("category")}
        >
          <h3 className="font-medium text-gray-700">Category</h3>
          {expandedSections.category ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {expandedSections.category && (
          <div className="space-y-2 mt-2">
            {Object.keys(categories).map((category) => (
              <label key={category} className="block">
                <input
                  type="checkbox"
                  value={category}
                  checked={filters.category.includes(category)}
                  onChange={(e) => handleCheckboxChange(e, "category")}
                  className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Subcategory */}
      {filters.category.length > 0 && (
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleToggleSection("subCategory")}
          >
            <h3 className="font-medium text-gray-700">Sub-Category</h3>
            {expandedSections.subCategory ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          {expandedSections.subCategory && (
            <div className="space-y-2 mt-2">
              {filters.category.flatMap((cat) => categories[cat] || []).map((subCategory) => (
                <label key={subCategory} className="block">
                  <input
                    type="checkbox"
                    value={subCategory}
                    checked={filters.subCategory.includes(subCategory)}
                    onChange={(e) => handleCheckboxChange(e, "subCategory")}
                    className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
                  />
                  <span className="text-gray-700">{subCategory}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gender */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleToggleSection("gender")}
        >
          <h3 className="font-medium text-gray-700">Gender</h3>
          {expandedSections.gender ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {expandedSections.gender && (
          <div className="space-y-2 mt-2">
            {["Male", "Female", "Unisex"].map((gender) => (
              <label key={gender} className="block">
                <input
                  type="checkbox"
                  value={gender.toLowerCase()}
                  checked={filters.gender.includes(gender.toLowerCase())}
                  onChange={(e) => handleCheckboxChange(e, "gender")}
                  className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
                />
                <span className="text-gray-700">{gender}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-medium text-gray-700">Price</h3>
        <div className="mt-4">
          <Slider
            range
            min={0}
            max={100000}
            step={10}
            value={filters.price}
            onChange={handleSliderChange}
            trackStyle={[{ backgroundColor: "#4f46e5" }]}
            handleStyle={[
              { borderColor: "#4f46e5", backgroundColor: "#4f46e5" },
              { borderColor: "#4f46e5", backgroundColor: "#4f46e5" },
            ]}
            railStyle={{ backgroundColor: "#e5e7eb" }}
          />
          <div className="flex justify-between text-gray-600 text-sm mt-2">
            <span>${filters.price[0]}</span>
            <span>${filters.price[1]}</span>
          </div>
        </div>
      </div>

      {/* Clear and Apply Buttons */}
      <div className="flex justify-end gap-6 mt-6">
        <button
          onClick={handleClearFilters}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          onClick={handleApplyFilters}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 whitespace-nowrap"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
