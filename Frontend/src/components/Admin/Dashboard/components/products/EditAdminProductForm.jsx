import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../Alert/Loading";
import Alert from "../../../../Alert/Alert";
import axios from "axios";
import EditProductImages from "./EditProductImages";

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

const EditAdminProductForm = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [updateStatus,setUpdateStatus] = useState(false);

  const adminToken = localStorage.getItem("adminToken");

  const location = useLocation();
  const navigate=useNavigate()

  // Create a URLSearchParams object from the query string
  const queryParams = new URLSearchParams(location.search);

  // Get the value of a specific query parameter
  const productId = queryParams.get("pid");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...product, [name]: value };
  
    // Calculate finalPrice if basePrice or discount changes
    if (name === "basePrice" || name === "discount") {
      const basePrice = parseFloat(updatedProduct.basePrice) || 0;
      const discount = parseFloat(updatedProduct.discount) || 0;
      const finalPrice = basePrice - (basePrice * discount) / 100;
      updatedProduct.finalPrice = Math.ceil(finalPrice);
    }
  
    setProduct(updatedProduct);
  };
  

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setProduct({ ...product, category, subCategory: "" });
  };

  const handleSubCategoryChange = (e) => {
    const subCategory = e.target.value;
    setSelectedSubCategory(subCategory);
    setProduct({ ...product, subCategory });
  };

  const updateProductInfo=async () => {
    const updatedData={
      _id:product._id,
      title:product.title,
      brand:product.brand,
      category:product.category,
      subCategory:product.subCategory,
      shortDescription:product.shortDescription,
      description:product.description,
      stockQuantity:product.stockQuantity,
      sku:product.sku,
      basePrice:product.basePrice,
      discount:product.discount,
      finalPrice:product.finalPrice,
      sizes:product.sizes,
      restockDate:product.restockDate
    }
    try {
      setUpdateStatus(true)
      const response=await axios.post('http://localhost:3000/admin/edit-product-info',
        updatedData,
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      )
      console.log(response.data)
      setAlert(response.data)
      setTimeout(()=>{
        setAlert(null);
        navigate(`/admin/dashboard/products/${product._id}`)
      },2000)
    } catch (err) {
      console.log(err)
      setAlert(err.response.data)
    }
    finally{
      setUpdateStatus(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., save to backend)
    updateProductInfo()
  
  };

 

  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/admin/get-product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      // console.log(response.data);
      setProduct(response.data);
      setSelectedCategory(response.data.category || "");
      setSelectedSubCategory(response.data.subCategory || "");
    } catch (error) {
      // console.log(error);
      setAlert(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails(productId);
  }, []);

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => {
            setAlert(null);
          }}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <EditProductImages images={product.images} id={product._id} setAlert={setAlert}/>
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Edit Product Details</h2>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="subCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Subcategory
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!selectedCategory}
              >
                <option value="">Select a Subcategory</option>
                {selectedCategory &&
                  categories[selectedCategory].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Product Title and Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Product Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Short Description and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Short Description
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={product.shortDescription}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stock Quantity and SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="stockQuantity"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="sku"
                className="block text-sm font-medium text-gray-700"
              >
                SKU
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Base Price and Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="basePrice"
                className="block text-sm font-medium text-gray-700"
              >
                Base Price
              </label>
              <input
                type="number"
                id="basePrice"
                name="basePrice"
                value={product.basePrice}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={product.discount}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Final Price */}
          <div className="mb-6">
            <label
              htmlFor="finalPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Final Price
            </label>
            <input
              type="number"
              id="finalPrice"
              name="finalPrice"
              value={product.finalPrice}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sizes Field */}
          <div className="mb-6">
            <label
              htmlFor="sizes"
              className="block text-sm font-medium text-gray-700"
            >
              Sizes
            </label>
            <input
              type="text"
              id="sizes"
              name="sizes"
              value={(product.sizes || []).join(", ")} // Ensure it's always an array
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "sizes",
                    value: e.target.value.split(",").map((size) => size.trim()),
                  },
                })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* restock date section */}

          {/* Restock Date Field */}
          <div className="mb-6">
            <label
              htmlFor="restockDate"
              className="block text-sm font-medium text-gray-700"
            >
              Restock Date
            </label>
            <input
              type="date"
              id="restockDate"
              name="restockDate"
              value={
                product.restockDate ? product.restockDate.split("T")[0] : ""
              }
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          

          <div className="w-full flex justify-center">
            {/* Submit Button */}
          <button
            type="submit"
            className=" px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {
              updateStatus?<span className="text-white font-medium text-lg animate-pulse">updating...</span>: `Update`
            }
          </button>
          </div>
        </form>
        </div>
      )}
    </>
  );
};

export default EditAdminProductForm;
