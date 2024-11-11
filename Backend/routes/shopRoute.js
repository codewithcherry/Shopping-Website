const express=require('express');
const shopController=require("../controllers/shop");
const validateController=require('../controllers/validate');

const router=express.Router()

router.get("/",shopController.getHome);
router.get("/product/:productId",shopController.getProductDetails)
router.get("/cart",validateController.authenticate,shopController.getCart)
router.post('/add-cartItem',validateController.authenticate,shopController.addCartItem);
router.delete('/delete-cartItem',validateController.authenticate,shopController.deleteCartItem);
router.put('/update-cartItemQuantity',validateController.authenticate,shopController.updateCartItemQuantity);
router.get('/user-address',validateController.authenticate,shopController.getUserAddress);
router.post('/user-createAddress',validateController.authenticate,shopController.addUserAddress);

module.exports=router;