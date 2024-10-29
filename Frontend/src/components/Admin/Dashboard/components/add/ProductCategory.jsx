import React, { useState,useEffect } from 'react';

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

const ProductCategory = ({ onSelectionChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);
  
    useEffect(() => {
      // Trigger the callback whenever either category or subcategory changes
      onSelectionChange(selectedCategory, selectedSubCategory);
    }, [selectedCategory, selectedSubCategory, onSelectionChange]);
  
    const handleCategoryChange = (event) => {
      const category = event.target.value;
      setSelectedCategory(category);
      setSubCategories(categories[category] || []);
      setSelectedSubCategory(''); // Reset subcategory when category changes
    };
  
    const handleSubCategoryChange = (event) => {
      setSelectedSubCategory(event.target.value);
    };
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Product Category</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">Main Category:</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
  
          {subCategories.length > 0 && (
            <div className="transition-opacity duration-300 ease-in-out opacity-100">
              <label className="block text-gray-600 text-sm font-medium mb-2">Sub Category:</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
              >
                <option value="">Select a sub-category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    );
  };
export default ProductCategory;
