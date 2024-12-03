const Product=require("../models/product");
const User=require("../models/user");

exports.getShopProducts = (req, res, next) => {
    const page = req.query.page || 1; // Default to page 1 if not provided
    const { category, subCategory } = req.params; // Get category and subcategory from URL params
    const limit = 8;
  
    // Build the filter object
    const filter = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
  
    // Get the total number of documents matching the filter
    Product.countDocuments({filter})
      .then((totaldoc) => {
        const pagination = {
          total: totaldoc,
          totalPages: Math.ceil(totaldoc / limit),
          currentPage: parseInt(page),
          nextPage: page < Math.ceil(totaldoc / limit),
          prevPage: page > 1,
        };
  
        // Query the products with the given filter
        return Product.find(filter)
          .skip((page - 1) * limit)
          .limit(limit)
          .then((products) => {
            // console.log(products)
            res.status(200).json({
              success: true,
              products: products,
              pagination: pagination,
            });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
      });
  };
  

exports.getHome = (req, res, next) => {
    const page = req.query.page || 1;
    const query = req.query.query || '';
    const limit = 8;

    const terms = query.split(' ').map(term => new RegExp(term, 'i'));

    Product.find({
        $or: [
            { title: { $in: terms } },
            { shortDescription: { $in: terms } },
            { category: { $in: terms } },
            { subCategory: { $in: terms } },
            { brand: { $in: terms } }
        ]
    })
    .then(filteredProducts => {
        const totaldoc = filteredProducts.length;
        const pagination = {
            total: totaldoc,
            totalPages: Math.ceil(totaldoc / limit),
            currentpage: page,
            nextPage: page < Math.ceil(totaldoc / limit),
            prevPage: page > 1
        };

        return Product.find({
            $or: [
                { title: { $in: terms } },
                { shortDescription: { $in: terms } },
                { category: { $in: terms } },
                { subCategory: { $in: terms } },
                { brand: { $in: terms } }
            ]
        })
        .sort({finalPrice: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .then(products => {
            res.status(200).json({
                success: true,
                products: products,
                pagination: pagination
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    });
};




exports.getProductDetails=async(req,res,next)=>{
    const productId=req.params.productId
    try{
        const product=await Product.findById(productId)
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json("internal server error")
    }
}

exports.getCart=async(req,res,next)=>{
    const userId=req.user.userId;

    try{
            const user=await User.findById(userId).populate({path:"cart.products.productId",model:"Product"})
            if(!user){
                return res.status(404).json({type:"error",message:"user cart not found, try again later"})
            }
            const data=user.cart
            const products=data.products
            const subtotal = data.products.reduce((sum, item) => sum + (item.productId.basePrice * item.quantity), 0);
            const total = data.products.reduce((sum, item) => sum + (item.productId.finalPrice * item.quantity), 0);
            const discount = subtotal - total;
            const tax = 0;
            const deliveryFee = total >= 199 ? 0 : 25;
            res.status(200).json({ products:products, subtotal: subtotal, discount: discount, deliveryFee: deliveryFee, tax: tax, total: total })
    }
    catch(err){
        res.status(500).json({type:'error',message:"internal server error"})
    }   
    
}

exports.addCartItem = async (req, res, next) => {
    const { productId, quantity, selectedSize } = req.body;  
    const userId = req.user.userId;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingCartProducts = user.cart.products;
        const existingcartProductsIndex = existingCartProducts.findIndex(item => item.productId.toString() === productId);

        if (existingcartProductsIndex !== -1) {
            // If the product exists in the cart, update its quantity
            existingCartProducts[existingcartProductsIndex].quantity += quantity; // Adjust the quantity as needed
            existingCartProducts[existingcartProductsIndex].size = selectedSize; // Update size if necessary
        } else {
            // If the product doesn't exist, add it to the cart
            const newProduct = { productId: productId, quantity: quantity, size: selectedSize };
            existingCartProducts.push(newProduct);
        }

        user.cart.products = existingCartProducts; // Update the user's cart
        await user.save(); // Await the save operation
        return res.status(200).json({ message: "Item added to cart", cart: user.cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.deleteCartItem=async(req,res,next)=>{
    const { productId } = req.body; // Expecting productId in the request body
    const userId = req.user.userId;
    
    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the product exists in the cart
        const productIndex = user.cart.products.findIndex(
            item => item.productId.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ type:"error", message: "Product not found in cart" });
        }

        // Remove the product from the cart
        user.cart.products.splice(productIndex, 1);

        // Save the updated cart
        await user.save();
        
        res.status(200).json({ type:"success", message: "Product removed from cart", cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ type:"error",message: "Internal server error" });
    }
}

exports.updateCartItemQuantity = async (req, res, next) => {
    const { productId, quantity } = req.body; // Expecting productId and new quantity in the request body
    const userId = req.user.userId;

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({type:"error", message: "User not found" });
        }

        // Find the product in the user's cart
        const cartProduct = user.cart.products.find(item => item.productId.toString() === productId);

        if (!cartProduct) {
            return res.status(404).json({ error:'error',message: "Product not found in cart" });
        }

        // Update the quantity directly
        cartProduct.quantity = quantity;

        // Save the updated cart
        await user.save();
        // console.log(user.cart)

        res.status(200).json({type:"success" , message: "Cart updated successfully", cart: user.cart });
    } catch (error) {
        // console.error(error);
        res.status(500).json({type:"error", message: "Internal server error" });
    }
};

exports.getUserAddress=async(req,res,next)=>{
    const userId=req.user.userId  
    try{
        const result=await User.findById(userId)
        const addresses=result.addresses
        res.status(200).json({type:"success",addresses:addresses})
    }
    catch(err){
        res.status(500).json({type:"error",message:"internal server error 500"})
    }
}

exports.addUserAddress=async(req,res,next)=>{
    const userId=req.user.userId
    const address=req.body
    try{
        const user=await User.findById(userId)
        const updatedAddresses=[...user.addresses,address]
        user.addresses=updatedAddresses
        await user.save()
        res.status(201).json({type:"success",message:"address added successfully"})
    }
    catch(err){
        res.status(500).json({type:"error",message:"Internal server error 500"})
    }
}

exports.removeUserAddress=async(req,res,next)=>{
    const userId=req.user.userId
    const addressId=req.body.addressId
    try{
        const user=await User.findById(userId)
        const updatedAddresses=user.addresses.filter(item=>item._id.toString()!==addressId)
        user.addresses=updatedAddresses
        await user.save()
        res.status(200).json({type:"success",message:"Successfully address is deleted"})
    }
    catch(err){
        res.status(500).json({type:"error",message:"Internal Server error 500"})
    }
}

exports.getRecentProducts=async(req,res,next)=>{
    const productIds=req.body.products;
    // console.log(productIds)
    try {
        // Use $in to find products where the _id is in the productIds array
        const products = await Product.find({
          _id: { $in: productIds }
        });
        
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({type:"error",message:"Internal server error",error:error})
      }
}

exports.postProductReview=async(req,res,next)=>{
    const {productId,rating,reviewText,images}=req.body
    const userId=req.user.userId;
    // console.log(req.user);
    // console.log(productId,rating,reviewText,images,userId);
    const review={user:userId,rating:rating,reviewText:reviewText,images:images,date:new Date()}
    try{
        const product = await Product.findById(productId);
        if (!product) {
        console.log("Product not found!");
        return;
        }

        await product.addReview(review);
        // console.log("Successfull")
        res.status(201).json({type:"success",message:"review posted successfully"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({type:"error",message:"Internal server error",error:err})
    }
}

exports.getReviews = async (req, res, next) => {
    const productId = req.params.productId;
    const { page = 1, limit = 5 } = req.query; // Defaults: page = 1, limit = 5

    try {
        const product = await Product.findById(productId).populate('reviews.user','username imageUrl');

        if (!product) {
            return res.status(404).json({ type: "error", message: "Product not found" });
        }

        // Get total number of reviews
        const totalReviews = product.reviews.length;

        // Pagination logic
        const startIndex = (page - 1) * limit; // Starting index
        const endIndex = page * limit; // Ending index
        const paginatedReviews = product.reviews.slice(startIndex, endIndex);

        // Response with paginated data
        res.status(200).json({
            type: "success",
            message:"successfully posted the review",
            page: parseInt(page),
            limit: parseInt(limit),
            totalReviews,
            ratingsData:product.ratingsData,
            reviews: paginatedReviews,
            hasNextPage: endIndex < totalReviews, // Check if there's more data
            hasPrevPage: startIndex > 0, // Check if there's previous data
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Internal server error",
            error: err,
        });
    }
};
