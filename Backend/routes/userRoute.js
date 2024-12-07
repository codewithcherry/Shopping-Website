const express=require('express');
const validateController=require("../controllers/validate");
const userController=require("../controllers/user");

const router=express.Router()

router.get('/get-wishlist',validateController.authenticate,userController.getUserWishlist);
router.get('/get-user-info',validateController.authenticate,userController.getUserInfo);
router.post('/add-to-wishlist',validateController.authenticate,userController.addToWishlist);
router.post('/change-password',validateController.authenticate,userController.changePassword);
router.post('/update-user-info',validateController.authenticate,userController.updateUserInfo);
router.post('/user-edit-address',validateController.authenticate,userController.editUserAddress);
router.delete('/remove-product-wishlist',validateController.authenticate,userController.removeProductFromWishlist);


module.exports=router;