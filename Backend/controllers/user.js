const User=require("../models/user");


exports.getUserWishlist = async (req, res, next) => {
    const userId = req.user.userId;

    try {
        // Find user and populate the wishlist array with product details
        const user = await User.findById(userId).populate('wishlist');

        if (!user) {
            return res.status(404).json({ type: "error", message: "User not found" });
        }

        res.status(200).json(user.wishlist); // Send the populated wishlist
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ type: "error", message: "Internal Server Error" });
    }
};


exports.addToWishlist=async(req,res,next)=>{
    const userId=req.user.userId;
    const {productId}=req.body;
    // console.log(userId,productId);

    try{
        const user=await User.findById(userId)
        const wishlist=user.wishlist;
        const exist= wishlist.find(item=>item==productId)
        if(!exist){
            wishlist.push(productId)
        }
        user.wishlist=wishlist;
        await user.save()

        // console.log('Added the product to wishlist')
        res.status(200).json({type:'success',message:'Successfully added to wishlist'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({type:"error",message:"failed to add to wishlist"})
    }

}

exports.removeProductFromWishlist = async (req, res) => {
    const productId = req.query.productId; // Extract productId from query parameters
    const userId = req.user.userId; // User ID from verifyToken middleware

    if (!productId) {
        return res.status(400).json({ type: 'error', message: 'Product ID is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ type: 'error', message: 'User not found' });
        }

        // Remove the product from the user's wishlist
        user.wishlist = user.wishlist.filter((item) => item.toString() !== productId);
        await user.save();

        res.status(200).json({ type: 'success', message: 'Product removed from wishlist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ type: 'error', message: 'Internal Server Error' });
    }
};

exports.updateUserInfo=async(req,res,next)=>{
    const userId=req.user.userId;
    const {imageUrl,firstname,lastname,useremail,phone}=req.body;
    try {
        const user=await User.findById(userId);
        if(!user){
            res.status(404).json({type:'error',message:"User not found"});
        }
        user.imageUrl=imageUrl
        user.firstname=firstname
        user.lastname=lastname
        user.username=`${firstname} ${lastname}`
        user.useremail=useremail
        user.phone=phone
        await user.save()

        res.status(201).json({type:'success',message:'User info updated successfully'})
    } catch (err) {
        res.status(500).json({ type: 'error', message: 'Internal Server Error' });
    }
}

exports.getUserInfo=async(req,res,next)=>{
    const userId=req.user.userId;
    // console.log(userId)
    try {
        const user=await User.findById(userId);
        if(!user){
            res.status(404).json({type:'error',message:"User not found"});
        }
        const data={
            firstname:user.firstname,
            lastname:user.lastname,
            useremail:user.useremail,
            imageUrl:user.imageUrl,
            phone:user.phone,
            address:user.addresses
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ type: 'error', message: 'Internal Server Error' });
    }
}

exports.editUserAddress=async(req,res,next)=>{
    const userId=req.user.userId;
    const index=req.query.index;
    const updatedAddrress=req.body;
    try {
        const user=await User.findById(userId);
        const userAddress=user.addresses;
        userAddress[index]=updatedAddrress
        user.addresses=userAddress;
        await user.save();
        res.status(201).json({type:'success',message:'User info updated successfully'})

    } catch (error) {
        res.status(500).json({ type: 'error', message: 'Internal Server Error' });
    
    }
}