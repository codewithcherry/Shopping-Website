const Order = require('../models/order'); // Adjust the path to your Order model file
const User =require('../models/user');
const {GenerateInvoice}=require("./invoice")



// Middleware to create a new order
exports.placeOrder = async (req, res, next) => {
  try {
    const userId=req.user.userId
    const {shippingAddress, paymentType, paymentMode, products, amount, paymentDetails } = req.body;
    // console.log(shippingAddress, paymentType, paymentMode, products, amount, paymentDetails)
    // Validate required fields
    if (!userId || !shippingAddress || !paymentType || !paymentMode || !products || !amount) {
      return res.status(400).json({ type:"warning",error: 'Missing required fields in order data.' });
    }

    const orderStatus="successfull"

    // Create a new order
    const newOrder = new Order({
      user: userId,
      shippingAddress,
      paymentType,
      paymentMode,
      paymentDetails,
      orderStatus,
      products: products.map(product => ({
        productId: product.productId,
        title:product.title,
        quantity: product.quantity,
        size: product.size,
      })),
      transactionDetails: {
        amount,
      },
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    const user=await User.findById(userId)

    user.cart={products:[]}

    await user.save()

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


exports.getUserOrders = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    // Fetch orders, populate products, and sort by `_id` in descending order
    const orders = await Order.find({ user: userId })
      .populate({ path: "products.productId", model: "Product" })
      .sort({ _id: -1 }); // Sort by _id in descending order to get the latest orders first

    if (!orders || orders.length === 0) {
      return res.status(404).json({ type: "error", message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (err) {
    // console.error("Error fetching orders:", err);  // Debugging output
    res.status(500).json({ type: "error", message: "Internal server error" });
  }
};

exports.generateInvoice=async(req,res,next)=>{
  const {orderId}=req.body;
  try{
    const order=await Order.findById(orderId).populate({ path: "products.productId", model: "Product" })
    GenerateInvoice(order,res)

  }
  catch(err){
    res.status(500).json({type:'error',message:"couldn't generate invoice try later"})
  }
}

