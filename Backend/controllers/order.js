const Order = require('../models/order'); // Adjust the path to your Order model file
const mongoose = require('mongoose');

// Middleware to create a new order
exports.placeOrder = async (req, res, next) => {
  try {
    const { userId, shippingAddress, paymentType, paymentMode, products, amount, paymentDetails } = req.body;

    // Validate required fields
    if (!userId || !shippingAddress || !paymentType || !paymentMode || !products || !amount) {
      return res.status(400).json({ error: 'Missing required fields in order data.' });
    }



    // Create a new order
    const newOrder = new Order({
      user: userId,
      shippingAddress,
      paymentType,
      paymentMode,
      paymentDetails,
      products: products.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
        size: product.size,
      })),
      transactionDetails: {
        amount,
      },
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Send response
    res.status(201).json({
      type:"success",
      message: 'Order created successfully',
      order: savedOrder,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ type:"error", message: 'Failed to create order.' });
  }
};