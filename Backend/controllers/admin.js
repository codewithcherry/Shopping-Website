const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require('moment'); // You can install it via npm if you haven't already
const jwt_secret=process.env.JWT_SECRET
const Product=require("../models/product")
const Order=require('../models/order');
const User = require("../models/user");

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

exports.getDashboard = async (req, res, next) => {
  const user = req.user; // Assuming authentication middleware sets req.user
  try {
      // Count total users, orders, and products
      const users = await User.countDocuments();
      const orders = await Order.countDocuments();
      const products = await Product.countDocuments();

      // Calculate total sales
      const totalSalesResult = await Order.aggregate([
          {
              $group: {
                  _id: null,
                  totalSales: { $sum: "$transactionDetails.amount" }, // Sum up the transaction amounts
              },
          },
      ]);

      const totalSales = totalSalesResult[0]?.totalSales || 0; // Handle case where no orders exist

      // Log the results for debugging
      // console.log(users, orders, products, totalSales);

      // Send response
      res.status(200).json({
          success: true,
          data: {
              totalUsers: users,
              totalOrders: orders,
              totalProducts: products,
              totalSales,
          },
      });
  } catch (err) {
      console.error("Error fetching dashboard data:", err);
      res.status(500).json({
          type: "error",
          message: "Internal Server Error",
      });
  }
};

exports.getSalesChart = async (req, res, next) => {
  const { month } = req.query; // Expecting month as a query parameter (e.g., '2023-12')
  
  if (!month) {
    return res.status(400).json({ type: 'error', message: "Month parameter is required" });
  }

  try {
    // Start date for the beginning of the month (00:00:00 in UTC)
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    
    // End date for the last moment of the month (23:59:59.999 in UTC)
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);  // Set to the last day of the month
    endDate.setHours(23, 59, 59, 999);  // Set to the last moment of the day

    // Aggregation pipeline
    const salesData = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: startDate,   // Orders greater than or equal to startDate
            $lte: endDate,     // Orders less than or equal to endDate
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$orderDate" }, // Group by day of the month
          totalSales: { $sum: "$transactionDetails.amount" }, // Sum of sales for each day
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day of the month
      },
    ]);

    // Check if no sales data was found and return an error message
    if (!salesData || salesData.length === 0) {
      return res.status(404).json({ type: "error", message: "No sales data found for the given month." });
    }

    // Return the sales data if found
    return res.json({ type: 'success', message: 'Successfully fetched sales chart data', Data: salesData });

  } catch (err) {
    // Log and handle errors properly, only sending one response
    console.error("Error Fetching Sales Chart Data:", err);
    if (!res.headersSent) {
      return res.status(500).json({ type: 'error', message: "Failed to fetch sales data" });
    }
  }
};



exports.getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to 1 if invalid
        const { category = [], subCategory = [], gender = [], price = [], sort = 'price-asc' } = req.query;
        const limit = 9;
        const skip = (parseInt(page) - 1) * limit; // Ensure we subtract 1 to get the correct offset

        // Validate page number to ensure it's a positive integer
        if (isNaN(page) || page < 1) {
            return res.status(400).json({
                type: 'error',
                message: 'Invalid page number'
            });
        }

        // Building the filter query
        let filterQuery = {};

        // Filter by category
        if (category.length > 0) {
            filterQuery.category = { $in: category };
        }

        // Filter by subCategory
        if (subCategory.length > 0) {
            filterQuery.subCategory = { $in: subCategory };
        }

        // Filter by gender
        if (gender.length > 0) {
            filterQuery.gender = { $in: gender };
        }

        // Filter by price range
        if (price.length === 2) {
            const [minPrice, maxPrice] = price;
            filterQuery.finalPrice = { $gte: minPrice, $lte: maxPrice };
        }

        // Sorting options
        let sortQuery = {};
        switch (sort) {
            case 'price-asc':
                sortQuery = { finalPrice: 1 };
                break;
            case 'price-desc':
                sortQuery = { finalPrice: -1 };
                break;
            case 'newest':
                sortQuery = { createdAt: -1 }; // Assuming you have a createdAt field
                break;
            default:
                sortQuery = { finalPrice: 1 };
                break;
        }

        // Fetch total number of products for pagination
        const totalDocs = await Product.countDocuments(filterQuery);

        // Calculate total pages and check if current page is out of range
        const totalPages = Math.ceil(totalDocs / limit);
        if (page > totalPages) {
            return res.status(400).json({
                type: 'error',
                message: 'Page number exceeds the total number of pages'
            });
        }

        // Pagination object
        const pagination = {
            total: totalDocs,
            totalPages: totalPages,
            currentpage: parseInt(page),
            nextPage: parseInt(page) < totalPages,
            prevPage: parseInt(page) > 1
        };

        // Fetch filtered and paginated products
        const products = await Product.find(filterQuery)
            .skip(skip)
            .limit(limit)
            .sort(sortQuery);

        // Send the response
        res.status(200).json({
            success: true,
            products: products,
            pagination: pagination
        });

    } catch (err) {
        // Error handling
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({
            type: 'error',
            message: 'Internal Server Error'
        });
    }
};


exports.getOrderlist = async (req, res, next) => {
  const pageno = parseInt(req.query.pageno) || 1;
  const limit = 10;

  // Build dynamic filter
  const filter = {};

  if (req.query.date) {
    // Assuming the date is stored as a string in 'YYYY-MM-DD' format or as a Date object
    const date = new Date(req.query.date);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    filter.orderDate = { $gte: date, $lt: nextDate }; // Filter by date range for the specified day
  }

  if (req.query.orderType) {
    filter.paymentType = { $in: req.query.orderType.split(",") }; // Handle multiple order types
  }

  if (req.query.orderStatus) {
    filter.orderStatus = { $in: req.query.orderStatus.split(",") }; // Handle multiple order statuses
  }

  try {
    // Count total documents matching the filter
    const totalOrders = await Order.countDocuments(filter);

    const pagination = {
      total: totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: pageno,
      nextPage: pageno < Math.ceil(totalOrders / limit) ? true : false,
      prevPage: pageno > 1 ? true : false,
    };

    // console.log(pagination);
    // Fetch the filtered orders
    const orders = await Order.find(filter)
      .sort({ _id: -1 })
      .skip((pageno - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      orders: orders,
      pagination: pagination,
    });
  } catch (err) {
    res.status(500).json({ type: "error", message: "Internal Server Error" });
  }
};


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


exports.getProductStock = async (req, res, next) => {
  const page = parseInt(req.query.pageno) || 1;
  const limit = 10;

  // Build dynamic filter
  const filter = {};

  if (req.query.category) {
    filter.category = { $in: req.query.category.split(",") }; // Multiple categories allowed
  }

  if (req.query.subcategory) {
    filter.subCategory = { $in: req.query.subcategory.split(",") }; // Multiple subcategories allowed
  }

  if (req.query.stock) {
    filter.status = { $in: req.query.stock.split(",") }; // Multiple stock statuses allowed
  }

  try {
    // Count total documents matching the filter
    const totalProducts = await Product.countDocuments(filter);

    const pagination = {
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      nextPage: page < Math.ceil(totalProducts / limit),
      prevPage: page > 1,
    };

    // Fetch the filtered products
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      products: products,
      pagination: pagination,
    });
  } catch (err) {
    res.status(500).json({ type: "error", message: "Internal Server Error" });
  }
};


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

  exports.updateAdminData = async (req, res, next) => {
    const adminId = req.user.user._id;
    const { firstname, lastname, email, phone, location, imageUrl } = req.body;
    
    try {
      // Await the result of the asynchronous findById
      const admin = await Admin.findById(adminId);
  
      if (!admin) {
        return res.status(404).json({ type: "error", message: 'user not found' });
      }
  
      // Update fields
      admin.firstname = firstname;
      admin.lastname = lastname;
      admin.email = email;
      admin.imageUrl = imageUrl;
      admin.phone = phone;
      admin.location = location;
  
      // Save the updated admin info
      await admin.save();
  
      res.status(200).json({ type: 'success', message: "Successfully updated the user info" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ type: 'error', message: 'An internal server error occurred' });
    }
  };

  
  exports.addNewAdminTask = async (req, res, next) => {
    const adminId = req.user.user._id; // Adjust based on req.user structure
    const newTask = req.body;
  
    // Validate newTask
    if (!newTask.title || !newTask.deadline ||!newTask.deadline) {
      return res.status(400).json({ type: "error", message: "Task data is incomplete" });
    }
  
    try {
      const admin = await Admin.findById(adminId);
  
      if (!admin) {
        return res.status(404).json({ type: "error", message: "User not found" });
      }
  
      // Add new task to admin tasks
      admin.tasks.push(newTask);
      await admin.save();
  
      res.status(201).json({ type: "success", message: "Task added successfully" });
    } catch (err) {
      console.error("Error adding admin task:", err); // Log error for debugging
      return res
        .status(500)
        .json({ type: "error", message: "An internal server error occurred" });
    }
  };

  exports.getAdminTasks = async (req, res, next) => {
    const adminId = req.user.user._id;
    const { status } = req.query; // Get the status from the query
    
    try {
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ type: "error", message: "User not found" });
      }
  
      let tasks = admin.tasks; // All tasks by default
  
      // Filter tasks based on the selected status
      if (status && status !== 'All') {
        if (status === 'Starred') {
          // If the status is 'Starred', filter tasks where starred is true
          tasks = tasks.filter(task => task.starred === true);
        } else {
          // Otherwise, filter tasks based on the status (e.g., 'To Do', 'In Progress')
          tasks = tasks.filter(task => task.status === status);
        }
      }
  
      // Sort tasks: pinned tasks (assuming there's a 'pinned' property) come first
      tasks.sort((a, b) => {
        if (a.pinned === true && b.pinned === false) {
          return -1; // 'a' (pinned) should come before 'b' (non-pinned)
        }
        if (a.pinned === false && b.pinned === true) {
          return 1; // 'b' (pinned) should come before 'a' (non-pinned)
        }
        return 0; // Keep their original order if both have the same 'pinned' status
      });
  
      // Sorting tasks by _id in descending order (latest first) for the final list
      tasks = tasks.sort((a, b) => {
        return new Date(b._id).getTime() - new Date(a._id).getTime();
      });
  
      res.status(200).json({
        type: "success",
        message: "Tasks fetched successfully",
        tasks: tasks
      });
  
    } catch (err) {
      console.error("Error fetching admin tasks:", err); // Log error for debugging
      return res.status(500).json({ type: "error", message: "An internal server error occurred" });
    }
  };
  
  
  
  
  
  exports.updateTaskPinned = async (req, res, next) => {
    const adminId = req.user.user._id;
    const taskId = req.query.id; // Fixed `id` to `taskId`
    const { pinned } = req.body;
  
    try {
      // Validate input
      if (!taskId) {
        return res.status(400).json({ type: "error", message: "Task ID is required" });
      }
  
      // Find admin by ID
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ type: "error", message: "Admin not found" });
      }
  
      // Locate the task
      const targetTask = admin.tasks.find((task) => (task._id).toString() === taskId); // Ensure task._id is used correctly
      if (!targetTask) {
        return res.status(404).json({ type: "error", message: "Task not found" });
      }
  
      // Update the task's pinned status
      targetTask.pinned = pinned;
  
      // Save changes to the admin document
      await admin.save();
  
      // Respond with success and updated task
      res.status(200).json({
        type: "success",
        message: "Task pinned status updated successfully",
        task: targetTask,
      });
    } catch (err) {
      console.error("Error updating task pinned status:", err);
      res.status(500).json({
        type: "error",
        message: "An error occurred while updating the task",
      });
    }
  };

  exports.updateTaskStarred = async (req, res, next) => {
    const adminId = req.user.user._id;
    const taskId = req.query.id; // Fixed `id` to `taskId`
    const { starred } = req.body;
  
    try {
      // Validate input
      if (!taskId) {
        return res.status(400).json({ type: "error", message: "Task ID is required" });
      }
  
      // Find admin by ID
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ type: "error", message: "Admin not found" });
      }
  
      // Locate the task
      const targetTask = admin.tasks.find((task) => (task._id).toString() === taskId); // Ensure task._id is used correctly
      if (!targetTask) {
        return res.status(404).json({ type: "error", message: "Task not found" });
      }
  
      // Update the task's pinned status
      targetTask.starred = starred;
  
      // Save changes to the admin document
      await admin.save();
  
      // Respond with success and updated task
      res.status(200).json({
        type: "success",
        message: "Task pinned status updated successfully",
        task: targetTask,
      });
    } catch (err) {
      console.error("Error updating task pinned status:", err);
      res.status(500).json({
        type: "error",
        message: "An error occurred while updating the task",
      });
    }
  };

  exports.updateTaskStatus = async (req, res) => {
    const adminId=req.user.user._id;
    const taskId = req.query.id;
    const { status } = req.body;
  
    try {
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const task = admin.tasks.find((task) => task._id.toString() === taskId);
      if (!task) {
        return res.status(404).json({type:'error', message: 'Task not found' });
      }
  
      task.status = status;
      await admin.save();
  
      res.status(200).json({type:'success', message: 'Task status updated', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({type:'error', message: 'Failed to update task status' });
    }
  };

  exports.deleteTask = async (req, res, next) => {
    const adminId = req.user.user._id;
    const taskId = req.query.id;
  
    try {
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const taskToDelete = admin.tasks.find((task) => task._id.toString() === taskId);
      if (!taskToDelete) {
        return res.status(404).json({ type: 'error', message: 'Task not found' });
      }
  
      const updatedTasks = admin.tasks.filter((task) => task._id.toString() !== taskId);
      admin.tasks = updatedTasks;
      await admin.save();
  
      res.status(200).json({ type: 'success', message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ type: 'error', message: 'Failed to delete the task' });
    }
  };

  exports.editTaskData = async (req, res, next) => {
    const adminId = req.user.user._id;
    const { title, description, importance, deadline } = req.body;
    const { taskId } = req.query;

    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const taskToEdit = admin.tasks.find((task) => task._id.toString() === taskId);
        if (!taskToEdit) {
            return res.status(404).json({ type: 'error', message: 'Task not found' });
        }

        // Update the task properties
        taskToEdit.title = title;
        taskToEdit.description = description;
        taskToEdit.importance = importance;
        taskToEdit.deadline = deadline;

        // There's no need to reassign the entire tasks array. Just save the changes
        await admin.save();

        res.status(200).json({ type: 'success', message: 'Task updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ type: 'error', message: 'Failed to update the task' });
    }
};

exports.getAdminEvents=async (req,res,next) => {
  const adminId=req.user.user._id;
  // console.log(adminId);
  try {
    const admin=await Admin.findById(adminId);
    if(!admin){
      res.status(404).json({type:'error',message:"user not found"})
    }
    const events=admin.events;
    // console.log(events)
    res.status(200).json({type:'success',message:"events fetched successfully",events:events})
  } catch (error) {
    console.error(error);
    res.status(500).json({ type: 'error', message: 'Internal server error' });
  }
}

exports.CreateNewEvent=async (req,res,next) => {
  const adminId=req.user.user._id;
  const eventData=req.body;
  // console.log(adminId,eventData);
  try {
    const admin=await Admin.findById(adminId);
    if(!admin){
      res.status(404).json({type:'error',message:"user not found"})
    }
    const events=admin.events;
    const updatedEvents=[...events,eventData]
    admin.events=updatedEvents
    await admin.save();

    res.status(201).json({type:"success",message:'event created successfully',events:admin.events});

  } catch (error) {
    console.error(error);
    res.status(500).json({ type: 'error', message: 'Internal server error' });
  }
}
  

exports.updateAdminEvent = async (req, res, next) => {
  try {
    const adminId = req.user.user._id;  // Extract admin ID from the JWT
    const { EventId } = req.params;      // Extract EventId from params
    const eventData = req.body;          // Extract event data from request body

    // Log for debugging purposes
    // console.log('Admin ID:', adminId);
    // console.log('Event ID:', EventId);
    // console.log('Event Data:', eventData);

    // Find the admin by ID
    const admin = await Admin.findById(adminId);

    // If admin doesn't exist, return an error
    if (!admin) {
      return res.status(404).json({type:"error", message: 'Admin not found' });
    }

    // Find the event within the admin's events array
    const eventIndex = admin.events.findIndex(event => event._id.toString() === EventId);

    // If the event is not found, return an error
    if (eventIndex === -1) {
      return res.status(404).json({type:"error", message: 'Event not found' });
    }

    // Update the event at the found index with the new event data
    admin.events[eventIndex] = {
      ...admin.events[eventIndex].toObject(), // Ensure we don't modify the Mongoose doc directly
      ...eventData,  // Update with the new data
    };

    // Save the updated admin document
    await admin.save();

    // Respond with a success message and the updated event
    res.status(200).json({
      type:"success",
      message: 'Event updated successfully',
      updatedEvent: admin.events[eventIndex],
    });
  } catch (err) {
    // Handle errors and return a response
    console.error(err);
    res.status(500).json({ type:'error',message: 'Server error', error: err });
  }
};

exports.deleteAdminEvent = async (req, res, next) => {
  try {
    const adminId = req.user.user._id;  // Extract admin ID from the JWT
    const { EventId } = req.params;      // Extract EventId from the request parameters

    // Log for debugging
    // console.log('Admin ID:', adminId);
    // console.log('Event ID:', EventId);

    // Find the admin by ID
    const admin = await Admin.findById(adminId);

    // If admin doesn't exist, return an error
    if (!admin) {
      return res.status(404).json({ type:"error",message: 'Admin not found' });
    }

    // Find the event index in the admin's events array
    const eventIndex = admin.events.findIndex(event => event._id.toString() === EventId);

    // If event is not found, return an error
    if (eventIndex === -1) {
      return res.status(404).json({ type:"error",message: 'Event not found' });
    }

    // Remove the event from the array
    admin.events.splice(eventIndex, 1);

    // Save the updated admin document
    await admin.save();

    // Send a success response
    res.status(200).json({
      type:'success',
      message: 'Event deleted successfully',
      eventId: EventId,
    });
  } catch (err) {
    // Handle errors and return a response
    console.error(err);
    res.status(500).json({ type:'error',message: 'Server error', error: err });
  }
};
