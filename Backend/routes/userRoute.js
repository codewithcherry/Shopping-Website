const express=require('express');
const validateController=require("../controllers/validate");
const userController=require("../controllers/user");

const router=express.Router()

router.get('/get-wishlist',validateController.authenticate,userController.getUserWishlist);
router.post('/add-to-wishlist',validateController.authenticate,userController.addToWishlist);
router.delete('/remove-product-wishlist',validateController.authenticate,userController.removeProductFromWishlist);

module.exports=router;