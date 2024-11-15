import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const categories = [
    {
      category: "Electronics",
      subCategory: [
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731686422/LaptopAndPC_z2guf8.png", name: "Computers & Laptops", path: "/electronics/computers-laptops" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731685716/mobilePhonesAndTablets_l82e3l.png", name: "Mobile Phones & Tablets", path: "/electronics/mobile-phones" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731686644/GamingConsoleCT_zpj7f6.png", name: "Gaming & Consoles", path: "/electronics/gaming-consoles" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731687045/AudioAndVideo_lp1cxw.png", name: "Audio & Video", path: "/electronics/audio-video" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731687189/SmartHomeAssistant_mmczla.png", name: "Smart Home Devices", path: "/electronics/smart-home" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731687476/DroneAndCamera_izudri.png", name: "Cameras & Drones", path: "/electronics/cameras-drones" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731687601/Wearable_jocnk4.png", name: "Wearable Technology", path: "/electronics/wearable-tech" },
      ],
    },
    {
      category: "Fashion & Apparel",
      subCategory: [
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688069/WomenClothing_epo4a1.png", name: "Women's Clothing", path: "/fashion/womens-clothing" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688234/MenClothing_mzqcbe.png", name: "Men's Clothing", path: "/fashion/mens-clothing" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688347/KidsClothing_ilhuoh.png", name: "Kids' Clothing", path: "/fashion/kids-clothing" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688520/footwear_wv09q3.png", name: "Footwear", path: "/fashion/footwear" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731688949/Accessories_j7btvu.png", name: "Accessories (bags, hats, jewelry, etc.)", path: "/fashion/accessories" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731689060/Lingeriewomen_qwrdvx.png", name: "Lingerie", path: "/fashion/lingerie" },
        { imageUrl: "https://res.cloudinary.com/demlcxzrb/image/upload/v1731689222/SportsWear_mwdoov.png", name: "Sportswear", path: "/fashion/sportswear" },
      ],
    },
    {
      category: "Home & Kitchen",
      subCategory: [
        { imageUrl: "https://example.com/furniture.png", name: "Furniture", path: "/home-kitchen/furniture" },
        { imageUrl: "https://example.com/home-decor.png", name: "Home Decor", path: "/home-kitchen/home-decor" },
        { imageUrl: "https://example.com/kitchen-appliances.png", name: "Kitchen Appliances", path: "/home-kitchen/kitchen-appliances" },
        { imageUrl: "https://example.com/bedding.png", name: "Bedding & Bath", path: "/home-kitchen/bedding-bath" },
        { imageUrl: "https://example.com/tools.png", name: "Home Improvement Tools", path: "/home-kitchen/tools" },
        { imageUrl: "https://example.com/garden-outdoor.png", name: "Garden & Outdoor", path: "/home-kitchen/garden-outdoor" },
      ],
    },
    {
      category: "Beauty & Personal Care",
      subCategory: [
        { imageUrl: "https://example.com/skincare.png", name: "Skincare", path: "/beauty/skincare" },
        { imageUrl: "https://example.com/haircare.png", name: "Haircare", path: "/beauty/haircare" },
        { imageUrl: "https://example.com/makeup.png", name: "Makeup", path: "/beauty/makeup" },
        { imageUrl: "https://example.com/fragrances.png", name: "Fragrances", path: "/beauty/fragrances" },
        { imageUrl: "https://example.com/hygiene.png", name: "Personal Hygiene", path: "/beauty/hygiene" },
        { imageUrl: "https://example.com/health-wellness.png", name: "Health & Wellness", path: "/beauty/health-wellness" },
      ],
    },
    {
      category: "Books, Media & Music",
      subCategory: [
        { imageUrl: "https://example.com/books.png", name: "Books", path: "/books-media/books" },
        { imageUrl: "https://example.com/movies.png", name: "Movies & TV Shows", path: "/books-media/movies-tv" },
        { imageUrl: "https://example.com/music.png", name: "Music", path: "/books-media/music" },
        { imageUrl: "https://example.com/games-toys.png", name: "Games & Toys", path: "/books-media/games-toys" },
        { imageUrl: "https://example.com/stationery.png", name: "Stationery & Office Supplies", path: "/books-media/stationery" },
      ],
    },
    {
      category: "Grocery & Gourmet",
      subCategory: [
        { imageUrl: "https://example.com/fresh-produce.png", name: "Fresh Produce", path: "/grocery/fresh-produce" },
        { imageUrl: "https://example.com/frozen-foods.png", name: "Frozen Foods", path: "/grocery/frozen-foods" },
        { imageUrl: "https://example.com/canned-foods.png", name: "Canned & Packaged Foods", path: "/grocery/canned-foods" },
        { imageUrl: "https://example.com/beverages.png", name: "Beverages", path: "/grocery/beverages" },
        { imageUrl: "https://example.com/snacks.png", name: "Snacks & Sweets", path: "/grocery/snacks-sweets" },
        { imageUrl: "https://example.com/international-foods.png", name: "International Foods", path: "/grocery/international-foods" },
      ],
    },
    {
      category: "Sports & Fitness",
      subCategory: [
        { imageUrl: "https://example.com/sports-equipment.png", name: "Sports Equipment", path: "/sports-fitness/sports-equipment" },
        { imageUrl: "https://example.com/fitness-equipment.png", name: "Fitness Equipment", path: "/sports-fitness/fitness-equipment" },
        { imageUrl: "https://example.com/sports-apparel.png", name: "Sports Apparel", path: "/sports-fitness/sports-apparel" },
        { imageUrl: "https://example.com/outdoor-gear.png", name: "Outdoor Gear", path: "/sports-fitness/outdoor-gear" },
      ],
    },
    {
      category: "Automotive",
      subCategory: [
        { imageUrl: "https://example.com/car-accessories.png", name: "Car Accessories", path: "/automotive/car-accessories" },
        { imageUrl: "https://example.com/bike-accessories.png", name: "Bike Accessories", path: "/automotive/bike-accessories" },
        { imageUrl: "https://example.com/car-parts.png", name: "Car Parts", path: "/automotive/car-parts" },
        { imageUrl: "https://example.com/bike-parts.png", name: "Bike Parts", path: "/automotive/bike-parts" },
      ],
    },
    {
      category: "Travel & Tourism",
      subCategory: [
        { imageUrl: "https://example.com/flight-tickets.png", name: "Flight Tickets", path: "/travel/flight-tickets" },
        { imageUrl: "https://example.com/hotel-bookings.png", name: "Hotel Bookings", path: "/travel/hotel-bookings" },
        { imageUrl: "https://example.com/holiday-packages.png", name: "Holiday Packages", path: "/travel/holiday-packages" },
        { imageUrl: "https://example.com/travel-insurance.png", name: "Travel Insurance", path: "/travel/travel-insurance" },
        { imageUrl: "https://example.com/visa-services.png", name: "Visa & Passport Services", path: "/travel/visa-services" },
      ],
    },
    {
      category: "Health & Medical",
      subCategory: [
        { imageUrl: "https://example.com/medical-devices.png", name: "Medical Devices", path: "/health-medical/medical-devices" },
        { imageUrl: "https://example.com/health-supplements.png", name: "Health Supplements", path: "/health-medical/health-supplements" },
        { imageUrl: "https://example.com/ayurvedic-products.png", name: "Ayurvedic Products", path: "/health-medical/ayurvedic-products" },
        { imageUrl: "https://example.com/home-healthcare.png", name: "Home Healthcare", path: "/health-medical/home-healthcare" },
      ],
    },
  ];
  
  

  const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [startIndex, setStartIndex] = useState(0);
    const [categoryIndex, setCategoryIndex] = useState(0);  // Track current category index
  
    const categoriesToShow = 4; // Number of categories to show at a time
  
    // Handle category tab click (this should not trigger sliding)
    const handleCategoryClick = (category, index) => {
      setActiveCategory(category);
      setCategoryIndex(index); // Set the clicked category index
      setStartIndex(0); // Reset subcategory carousel index
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
  
    const handleNext = () => {
      if (startIndex + 1 < activeCategory.subCategory.length) {
        setStartIndex(startIndex + 1);
      }
    };
  
    const handlePrev = () => {
      if (startIndex - 1 >= 0) {
        setStartIndex(startIndex - 1);
      }
    };
  
    const visibleSubCategories = activeCategory.subCategory.slice(startIndex, startIndex + 1);
  
    // Calculate if the previous/next buttons should be disabled based on current index
    const isPrevDisabled = startIndex === 0;
    const isNextDisabled = startIndex + 1 >= activeCategory.subCategory.length;
  
    const isPrevCategoryDisabled = categoryIndex === 0;
    const isNextCategoryDisabled = categoryIndex >= categories.length - categoriesToShow;
  
    return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className=" w-[80%] py-6 space-y-4">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-indigo-600">Categories</h2>
  
        {/* Category Navigation Arrows */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevCategory}
            disabled={isPrevCategoryDisabled}
            className={`text-gray-500 ${isPrevCategoryDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="overflow-hidden">
            <div className="flex">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category, index)} // Only change category without sliding
                  className={`flex-shrink-0 px-4 py-2 cursor-pointer font-medium transition-all ${
                    activeCategory === category
                      ? 'text-blue-600 font-semibold underline underline-offset-4' // Style for active category
                      : 'text-gray-600'
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
            className={`text-gray-500 ${isNextCategoryDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
  
        {/* Subcategory Carousel */}
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-indigo-500">Sub-Category</h3>
            {activeCategory.subCategory.length > 1 && (
              <div className="flex space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={isPrevDisabled}
                  className={`text-gray-500 ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  className={`text-gray-500 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
  
          {/* Carousel Container */}
          <div className="overflow-hidden mx-4">
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${startIndex * 20}%)`, // Moves by one card (20% width)
              }}
            >
              {activeCategory.subCategory.map((sub, index) => (
                                    <div key={index} className="w-1/5 flex-shrink-0 px-2">
                                        <div
                                        className="bg-white rounded-lg shadow-lg mx-auto transform transition hover:-translate-y-1 hover:shadow-2xl relative"
                                        style={{
                                            width: '100%',
                                            height: '0',
                                            paddingBottom: '120%', // Makes the card slightly taller than wide
                                            backgroundImage: `url(${sub.imageUrl})`, // Set image as background
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                        >
                                        <div className="absolute bottom-0 w-full  p-4 text-center rounded-b-lg">
                                            <h3 className="text-md font-semibold text-white ">{sub.name}</h3>
                                            <Link to={sub.path} className="text-indigo-800 font-medium hover:underline">
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