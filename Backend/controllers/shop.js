const Product=require("../models/product");
const User=require("../models/user");

exports.getHome=(req,res,next)=>{
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
        console.log(err);
    })
}

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
