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


exports.getProductStock=async (req,res,next) => {
    const pageno=Number(req.query.pageno);
    const limit=10;
    Product.countDocuments().then(totalProducts=>{
        const pagination={
            total:totalProducts,
            totalPages:Math.ceil(totalProducts/limit),
            currentpage:pageno,
            nextPage:pageno<(Math.ceil(totalProducts/limit))?true:false,
            prevPage:pageno>1?true:false
           }
           return Product.find()
           .sort({ _id: -1 })
           .skip((pageno-1)*limit)
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
        res.status(500).json({type:"error",message:"Internal Server Error"});
    })
    
}

exports.editProductInfo=async (req,res,next) => {
  const { _id, ...updateData } = req.body;

  if (!_id) {
    return res.status(400).json({ error: 'Product _id is required.' });
  }

  try {
    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json({ type:"success", message: 'Product updated successfully.', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ type:"error", error: 'An error occurred while updating the product.' });
  }
}

exports.updateProductImages = async (req, res, next) => {
    const { productImages, removedImages } = req.body; // Extract images data from the request body
    const productId = req.query.id; // Extract the product ID from the query params
  
    // Check if images data is provided
    if (!productImages) {
      return res.status(400).json({ type:'error', message: "productImages are required." });
    }
  
    try {
      // Find the product by ID and update its images
      const product = await Product.findByIdAndUpdate(
        productId, // Find product by ID
        { $set: { images: productImages } }, // Set the new product images
        { new: true } // Return the updated product
      );
  
      if (!product) {
        return res.status(404).json({ type:'error', message: "Product not found" });
      }
  
      // Optionally, if you need to process removed images (e.g., delete them from cloud storage), handle it here
      // for example, delete images from Cloudinary or another service
  
      // Send response with updated product
      res.status(200).json({
        type:"success",
        message: "Product images updated successfully",
        updatedProduct: product,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ type:'error', message: "Internal Server Error" });
    }
  };

  exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.productId; // Extract productId from request parameters
  
    try {
      // Find the product by ID
      const product = await Product.findById(productId);
  
      // If the product doesn't exist, return a 404 error
      if (!product) {
        return res.status(404).json({ type:"error", message: 'Product not found' });
      }
  
      // Optional: If the product has images associated with it, delete those images from Cloudinary
      // if (product.images && product.images.length > 0) {
      //   for (let imageUrl of product.images) {
      //     // Extract the public ID of the image from the URL
      //     const publicId = imageUrl.split('/').pop().split('.')[0];
          
      //     // Delete the image from Cloudinary using its public ID
      //     await cloudinary.uploader.destroy(publicId);
      //     console.log(`Deleted image: ${imageUrl}`);
      //   }
      // }
  
      // Delete the product from the database
      await Product.findByIdAndDelete(productId);
  
      // Send a success response after product deletion
      return res.status(200).json({type:'success', message: 'Product deleted successfully' });
    } catch (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({type:'error', message: 'An error occurred while deleting the product' });
    }
  };

  exports.getAdminData=async (req,res,next) => {
    const adminId=req.user.user._id
    try {
      const admin=await Admin.findById(adminId).select('-password');
      if(!admin){
        return res.status(404).json({ type:"error", message: 'user not found' });
      }
      res.status(200).json({type:'success',message:"user fetched successfully",admin:admin});
    } catch (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({type:'error', message: 'An Internal server error occured' });
    }
  }