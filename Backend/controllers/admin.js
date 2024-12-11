const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret=process.env.JWT_SECRET
const Product=require("../models/product")
const Order=require('../models/order');

exports.adminLogin = async (req, res, next) => {
    const { username, password } = req.body;
    // console.log(username, password);
    try {
        const admin = await Admin.findOne({ username: username });
        if (!admin) {
            return res.status(404).json({ type: "error", message: 'Admin does not exist' });
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            return res.status(400).json({type:"error",message:"Password does not match"});
        }

        // Authentication successful
        const token = jwt.sign(
            { user:admin}, // Payload (user info)
            jwt_secret, // Secret key
            { expiresIn: '1h' } )

        return res.status(200).json({type:"success",message:"Login successful" ,token:token});

    } catch (err) {
        return res.status(500).json({type:"error",message:"Internal server error"});
    }
};

exports.addProduct = async (req, res, next) => {
    try {
        const productData = req.body; // Get the product data from the request body      

        // Create a new product instance
        const newProduct = new Product({
            title: productData.title,
            shortDescription: productData.shortDescription,
            description: productData.description,
            brand: productData.brand,
            category: productData.category,
            subCategory: productData.subCategory,
            images: productData.images,
            stockQuantity: productData.stockQuantity,
            sku: productData.sku,
            restockDate: productData.restockDate,
            basePrice: productData.basePrice,
            discount: productData.discount,
            finalPrice: productData.finalPrice,
            sizes: productData.sizes,
            createdBy: req.user._id // Assuming you're using middleware to set req.user with the authenticated user
        });

        // Save the product to the database
        await newProduct.save();

        // Respond with the created product
        res.status(201).json({
            type:"success",
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        
        res.status(500).json({
            type:"error",
            message: 'Error creating product',
            error: error.message
        });
    }
};

exports.getDashboard=(req,res,next)=>{
    const user=req.user;
    console.log("dashboard rendered");
}

exports.getProducts=(req,res,next)=>{
    const page=req.query.page;
    const limit=8;
    Product.countDocuments().then(totaldoc=>{
       const pagination={
        total:totaldoc,
        totalPages:Math.ceil(totaldoc/limit),
        currentpage:page,
        nextPage:page<(Math.ceil(totaldoc/limit))?true:false,
        prevPage:page>1?true:false
       }
       return    Product.find()
                        .skip((page-1)*limit)
                        .limit(limit)
                        .then(products=>{
                            res.status(200).json({
                                success: true,
                                products: products,
                                pagination:pagination
                                });
                        })
    })
    .catch(err=>{
        res.status(500).json({type:"error",message:"Internal Server Error"})
    })
}

exports.getOrderlist=async(req,res,next)=>{
    const pageno=req.query.pageno;
    const limit=10;
    Order.countDocuments().then(totalOrders=>{
        const pagination={
            total:totalOrders,
            totalPages:Math.ceil(totalOrders/limit),
            currentpage:pageno,
            nextPage:pageno<(Math.ceil(totalOrders/limit))?true:false,
            prevPage:pageno>1?true:false
           }
           return Order.find()
           .sort({ _id: -1 })
           .skip((pageno-1)*limit)
           .limit(limit)
           .then(orders=>{
               res.status(200).json({
                   success: true,
                   orders: orders,
                   pagination:pagination
                   });
           })
    })
    .catch(err=>{
        res.status(500).json({type:"error",message:"Internal Server Error"});
    })
    
}

exports.createTeam = async (req, res, next) => {
    const adminId = req.user?.user?._id; // Ensure proper user object structure
    const { firstname, lastname, username, email, password, phone, role } = req.body;
  
    // Validate required fields
    if (!firstname || !lastname || !username || !email || !password || !phone || !role) {
      return res.status(400).json({ type: 'error', message: 'All fields are required.' });
    }
  
    try {
      // Check if the username or email already exists
      const existingAdmin = await Admin.findOne({
        $or: [{ username }, { email }],
      });
  
      if (existingAdmin) {
        return res.status(409).json({
          type: 'error',
          message: 'An admin already exists with the same username or email.',
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new admin
      const newAdmin = new Admin({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        phone,
        role,
        createdBy: adminId,
      });
  
      // Save to database
      await newAdmin.save();
  
      // Return success response
      return res.status(201).json({
        type: 'success',
        message: 'Successfully added new teammate.',
      });
    } catch (error) {
      console.error('Error creating team:', error);
      return res.status(500).json({
        type: 'error',
        message: 'Internal Server Error. Please try again later.',
      });
    }
  };
  

  exports.getAdmins = async (req, res, next) => {
    try {
        // Exclude specific fields like "password" and "__v" by prefixing with a minus (-)
        const admins = await Admin.find().select('-password -__v');

        res.status(200).json(admins); // Send filtered admin data
    } catch (error) {
        res.status(500).json({ type: 'error', message: "Internal server error" });
    }
};
