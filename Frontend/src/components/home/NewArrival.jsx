import React from "react";

const NewArrival = () => {
  const arrivals = [
    {
      imageUrl:
        "https://res.cloudinary.com/demlcxzrb/image/upload/v1732616153/womens_collection_arrival-min_nt7fgt.png", // Replace with actual Women's Collection image URL
      title: "Women's Collections",
      description: "Featured women's collections that give you another vibe.",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/demlcxzrb/image/upload/v1732616558/Speakers_Arrival-min_weeyha.png", // Replace with actual Speakers image URL
      title: "Headphones",
      description: "Brand new wireless headphones.",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/demlcxzrb/image/upload/v1732616725/Perfume_arrival_cnmiue.png", // Replace with actual Perfume image URL
      title: "Perfume",
      description: "GUCCI INTENSE OUD EDP.",
    },
  ];

  return (
    <div className="w-[80%] max-w-7xl mx-auto my-8 px-4">
      <h2 className="text-indigo-500 text-2xl font-bold mb-6">New Arrival</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Card */}
        <div
          className="relative col-span-1 md:col-span-2 row-span-2 rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url(${arrivals[0].imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "430px",
          }}
        >
          <div className="absolute inset-0" />
          <div className="absolute bottom-4 left-4 text-white z-10">
            <h3 className="text-xl font-semibold">{arrivals[0].title}</h3>
            <p className="text-sm text-gray-300">{arrivals[0].description}</p>
            <button className="mt-2  py-1 text-gray-200 underline underline-offset-4 font-semibold text-sm  hover:text-gray-300">
              Shop Now
            </button>
          </div>
        </div>

        {/* Other Cards */}
        {arrivals.slice(1).map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
            }}
          >
            <div className="absolute inset-0" />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.description}</p>
              <button className="mt-2  py-1 text-gray-200 underline underline-offset-4 font-semibold text-sm  hover:text-gray-300">
              Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
