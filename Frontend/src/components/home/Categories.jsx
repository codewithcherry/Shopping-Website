import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const categories = [
  {
    category: "Electronics",
    subCategory: [
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731686422/LaptopAndPC_z2guf8.png", name: "Computers & Laptops", path: "/Electronics/Computers & Laptops" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731685716/mobilePhonesAndTablets_l82e3l.png", name: "Mobile Phones & Tablets", path: "/Electronics/Mobile Phones & Tablets" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731686644/GamingConsoleCT_zpj7f6.png", name: "Gaming & Consoles", path: "/Electronics/Gaming & Consoles" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731687045/AudioAndVideo_lp1cxw.png", name: "Audio & Video", path: "/Electronics/Audio & Video" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731687189/SmartHomeAssistant_mmczla.png", name: "Smart Home Devices", path: "/Electronics/Smart Home Devices" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731687476/DroneAndCamera_izudri.png", name: "Cameras & Drones", path: "/Electronics/Cameras & Drones" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731687601/Wearable_jocnk4.png", name: "Wearable Technology", path: "/Electronics/Wearable Technology" },
    ],
  },
  {
    category: "Fashion & Apparel",
    subCategory: [
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688069/WomenClothing_epo4a1.png", name: "Women's Clothing", path: "/Fashion & Apparel/Women's Clothing" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688234/MenClothing_mzqcbe.png", name: "Men's Clothing", path: "/Fashion & Apparel/Men's Clothing" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688347/KidsClothing_ilhuoh.png", name: "Kids' Clothing", path: "/Fashion & Apparel/Kids' Clothing" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688520/footwear_wv09q3.png", name: "Footwear", path: "/Fashion & Apparel/Footwear" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688949/Accessories_j7btvu.png", name: "Accessories (bags, hats, jewelry, etc.)", path: "/Fashion & Apparel/Accessories (bags, hats, jewelry, etc.)" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731689060/Lingeriewomen_qwrdvx.png", name: "Lingerie", path: "/Fashion & Apparel/Lingerie" },
      { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731689222/SportsWear_mwdoov.png", name: "Sportswear", path: "/Fashion & Apparel/Sportswear" },
    ],
  },
  {
    category: "Home & Kitchen",
    subCategory: [
      { imageUrl: "https://example.com/furniture.png", name: "Furniture", path: "/Home & Kitchen/Furniture" },
      { imageUrl: "https://example.com/home-decor.png", name: "Home Decor", path: "/Home & Kitchen/Home Decor" },
      { imageUrl: "https://example.com/kitchen-appliances.png", name: "Kitchen Appliances", path: "/Home & Kitchen/Kitchen Appliances" },
      { imageUrl: "https://example.com/bedding.png", name: "Bedding & Bath", path: "/Home & Kitchen/Bedding & Bath" },
      { imageUrl: "https://example.com/tools.png", name: "Home Improvement Tools", path: "/Home & Kitchen/Home Improvement Tools" },
      { imageUrl: "https://example.com/garden-outdoor.png", name: "Garden & Outdoor", path: "/Home & Kitchen/Garden & Outdoor" },
    ],
  },
  {
    category: "Beauty & Personal Care",
    subCategory: [
      { imageUrl: "https://example.com/skincare.png", name: "Skincare", path: "/Beauty & Personal Care/Skincare" },
      { imageUrl: "https://example.com/haircare.png", name: "Haircare", path: "/Beauty & Personal Care/Haircare" },
      { imageUrl: "https://example.com/makeup.png", name: "Makeup", path: "/Beauty & Personal Care/Makeup" },
      { imageUrl: "https://example.com/fragrances.png", name: "Fragrances", path: "/Beauty & Personal Care/Fragrances" },
      { imageUrl: "https://example.com/hygiene.png", name: "Personal Hygiene", path: "/Beauty & Personal Care/Personal Hygiene" },
      { imageUrl: "https://example.com/health-wellness.png", name: "Health & Wellness", path: "/Beauty & Personal Care/Health & Wellness" },
    ],
  },
  {
    category: "Books, Media & Music",
    subCategory: [
      { imageUrl: "https://example.com/books.png", name: "Books", path: "/Books, Media & Music/Books" },
      { imageUrl: "https://example.com/movies.png", name: "Movies & TV Shows", path: "/Books, Media & Music/Movies & TV Shows" },
      { imageUrl: "https://example.com/music.png", name: "Music", path: "/Books, Media & Music/Music" },
      { imageUrl: "https://example.com/games-toys.png", name: "Games & Toys", path: "/Books, Media & Music/Games & Toys" },
      { imageUrl: "https://example.com/stationery.png", name: "Stationery & Office Supplies", path: "/Books, Media & Music/Stationery & Office Supplies" },
    ],
  },
  {
    category: "Grocery & Gourmet",
    subCategory: [
      { imageUrl: "https://example.com/fresh-produce.png", name: "Fresh Produce", path: "/Grocery & Gourmet/Fresh Produce" },
      { imageUrl: "https://example.com/frozen-foods.png", name: "Frozen Foods", path: "/Grocery & Gourmet/Frozen Foods" },
      { imageUrl: "https://example.com/canned-foods.png", name: "Canned & Packaged Foods", path: "/Grocery & Gourmet/Canned & Packaged Foods" },
      { imageUrl: "https://example.com/beverages.png", name: "Beverages", path: "/Grocery & Gourmet/Beverages" },
      { imageUrl: "https://example.com/snacks.png", name: "Snacks & Sweets", path: "/Grocery & Gourmet/Snacks & Sweets" },
      { imageUrl: "https://example.com/international-foods.png", name: "International Foods", path: "/Grocery & Gourmet/International Foods" },
    ],
  },
  {
    category: "Sports & Fitness",
    subCategory: [
      { imageUrl: "https://example.com/sports-equipment.png", name: "Sports Equipment", path: "/Sports & Fitness/Sports Equipment" },
      { imageUrl: "https://example.com/fitness-equipment.png", name: "Fitness Equipment", path: "/Sports & Fitness/Fitness Equipment" },
      { imageUrl: "https://example.com/sports-apparel.png", name: "Sports Apparel", path: "/Sports & Fitness/Sports Apparel" },
      { imageUrl: "https://example.com/outdoor-gear.png", name: "Outdoor Gear", path: "/Sports & Fitness/Outdoor Gear" },
    ],
  },
  {
    category: "Automotive",
    subCategory: [
      { imageUrl: "https://example.com/car-accessories.png", name: "Car Accessories", path: "/Automotive/Car Accessories" },
      { imageUrl: "https://example.com/bike-accessories.png", name: "Bike Accessories", path: "/Automotive/Bike Accessories" },
      { imageUrl: "https://example.com/car-parts.png", name: "Car Parts", path: "/Automotive/Car Parts" },
      { imageUrl: "https://example.com/bike-parts.png", name: "Bike Parts", path: "/Automotive/Bike Parts" },
    ],
  },
  {
    category: "Travel & Tourism",
    subCategory: [
      { imageUrl: "https://example.com/flight-tickets.png", name: "Flight Tickets", path: "/Travel & Tourism/Flight Tickets" },
      { imageUrl: "https://example.com/hotel-bookings.png", name: "Hotel Bookings", path: "/Travel & Tourism/Hotel Bookings" },
      { imageUrl: "https://example.com/holiday-packages.png", name: "Holiday Packages", path: "/Travel & Tourism/Holiday Packages" },
      { imageUrl: "https://example.com/travel-insurance.png", name: "Travel Insurance", path: "/Travel & Tourism/Travel Insurance" },
      { imageUrl: "https://example.com/visa-services.png", name: "Visa & Passport Services", path: "/Travel & Tourism/Visa & Passport Services" },
    ],
  },
  {
    category: "Health & Medical",
    subCategory: [
      { imageUrl: "https://example.com/medical-devices.png", name: "Medical Devices", path: "/Health & Medical/Medical Devices" },
      { imageUrl: "https://example.com/health-supplements.png", name: "Health Supplements", path: "/Health & Medical/Health Supplements" },
      { imageUrl: "https://example.com/ayurvedic-products.png", name: "Ayurvedic Products", path: "/Health & Medical/Ayurvedic Products" },
      { imageUrl: "https://example.com/home-healthcare.png", name: "Home Healthcare", path: "/Health & Medical/Home Healthcare" },
    ],
  },
];

  
  

  const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [startIndex, setStartIndex] = useState(0);
    const [categoryIndex, setCategoryIndex] = useState(0);
  
    const categoriesToShow = 6; // Number of categories to show at a time
    const subcategoriesToShow = 5; // Number of subcategories to show at a time
  
    // Handle category tab click (does not affect category sliding anymore)
    const handleCategoryClick = (category) => {
      setActiveCategory(category); // Only update active category without affecting sliding
      setStartIndex(0); // Reset subcategory carousel index when a new category is selected
    };
  
    const handleNextCategory = () => {
      if (categoryIndex < categories.length - categoriesToShow) {
        setCategoryIndex(categoryIndex + 1);
      }
    };
  
    const handlePrevCategory = () => {
      if (categoryIndex > 0) {
        setCategoryIndex(categoryIndex - 1);
      }
    };
  
    const handleNextSubcategory = () => {
      if (startIndex + subcategoriesToShow < activeCategory.subCategory.length) {
        setStartIndex(startIndex + 1);
      }
    };
  
    const handlePrevSubcategory = () => {
      if (startIndex > 0) {
        setStartIndex(startIndex - 1);
      }
    };
  
    const visibleSubCategories = activeCategory.subCategory.slice(
      startIndex,
      startIndex + subcategoriesToShow
    );
  
    const isPrevSubcategoryDisabled = startIndex === 0;
    const isNextSubcategoryDisabled =
      startIndex + subcategoriesToShow >= activeCategory.subCategory.length;
  
    const isPrevCategoryDisabled = categoryIndex === 0;
    const isNextCategoryDisabled =
      categoryIndex >= categories.length - categoriesToShow;
  
    return (
      <div className="flex justify-center items-center bg-gray-100">
        <div className="w-[80%] py-6 space-y-4">
          {/* Title */}
          <h2 className="text-3xl font-semibold text-indigo-600">Categories</h2>
  
          {/* Category Navigation Arrows */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevCategory}
              disabled={isPrevCategoryDisabled}
              className={`text-gray-500 ${
                isPrevCategoryDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"
              }`}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${categoryIndex * (100 / categoriesToShow)}%)`,
                }}
              >
                {categories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => handleCategoryClick(category)} // Only update the active category
                    className={`flex-shrink-0 px-4 py-2 cursor-pointer font-medium transition-all ${
                      activeCategory === category
                        ? "text-blue-600 font-semibold underline underline-offset-4"
                        : "text-gray-600"
                    }`}
                  >
                    {category.category}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNextCategory}
              disabled={isNextCategoryDisabled}
              className={`text-gray-500 ${
                isNextCategoryDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"
              }`}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
  
          {/* Subcategory Carousel */}
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-500">Sub-Category</h3>
              {activeCategory.subCategory.length > subcategoriesToShow && (
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevSubcategory}
                    disabled={isPrevSubcategoryDisabled}
                    className={`text-gray-500 ${
                      isPrevSubcategoryDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"
                    }`}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextSubcategory}
                    disabled={isNextSubcategoryDisabled}
                    className={`text-gray-500 ${
                      isNextSubcategoryDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"
                    }`}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
  
            {/* Carousel Container */}
            <div className="overflow-hidden mx-4 p-2">
              <div
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${startIndex * (100 / subcategoriesToShow)}%)`,
                }}
              >
                {visibleSubCategories.map((sub, index) => (
                  <div key={index} className="w-1/5 flex-shrink-0 px-2">
                    <div
                      className="bg-white rounded-lg mx-auto transform transition hover:-translate-y-1 hover:shadow-lg relative"
                      style={{
                        width: "100%",
                        height: "0",
                        paddingBottom: "120%",
                        backgroundImage: `url(${sub.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute bottom-0 w-full p-4 text-center rounded-b-lg">
                        <h3 className="text-md font-semibold text-white">{sub.name}</h3>
                        <Link
                          to={"/shop"+sub.path}
                          className="text-indigo-800 font-medium hover:underline"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Categories;