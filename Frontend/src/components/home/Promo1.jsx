import React from "react";
import { Link } from "react-router-dom";

const Promo1 = () => {
  const promo = {
    imageUrl:
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1732611033/sony-promo1-camera_gear_update_gajkcd.png",
    productName: "Sony Alpha 7 M4",
    productId: "",
    discountDescription: "Buy the new Sony camera for great discounts this sale",
  };

  return (
    <div className="w-[90%] max-w-7xl mx-auto my-8">
      <div
        className="relative w-full h-[400px] bg-cover bg-center rounded-lg shadow-lg overflow-hidden text-white"
        style={{ backgroundImage: `url(${promo.imageUrl})` }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 " />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-16 space-y-6">
          <h2 className="text-4xl md:text-3xl font-bold">{promo.productName}</h2>
          <p className="text-lg md:text-md text-gray-300 max-w-lg">
            {promo.discountDescription}
          </p>
          <Link
            to={`/product/${promo.productId}`}
            className="inline-block px-4 py-2 w-32 text-md font-semibold text-black bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500 transition-colors"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Promo1;
