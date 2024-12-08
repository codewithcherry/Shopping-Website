// models/User.js
const mongoose = require("mongoose");

// Define Address Schema
const addressSchema = new mongoose.Schema({
  fullName: { type: String },
  doorNumber: { type: String },
  streetArea: { type: String },
  landmark: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: Number },
  phoneNumber: { type: Number },
});

// Define Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  size: {
    type: String,
    default: "os",
  },
});

// Define Order Schema
const orderSchema = new mongoose.Schema({
  products: [cartItemSchema],
  totalAmount: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
  },
  shippingAddress: addressSchema,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
    default:
      "https://res.cloudinary.com/demlcxzrb/image/upload/v1733217270/default-profile_hvlm0x.jpg",
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  cart: {
    products: [cartItemSchema],
  }, // Array of items in the cart
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ], // Array of product IDs for the wishlist
  orders: [orderSchema], // Array of order history
  addresses: [addressSchema], // Array of saved addresses
  resetPasswordToken: {
    type: String, // Store the hashed token
  },
  resetPasswordTokenExpires: {
    type: Date, // Store the expiration timestamp
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
