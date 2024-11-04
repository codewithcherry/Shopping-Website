const express=require('express');
const shopController=require("../controllers/shop");
const validateController=require('../controllers/validate');

const router=express.Router()

router.get("/",shopController.getHome);
router.get("/product/:productId",shopController.getProductDetails)
router.get("/cart",validateController.authenticate,shopController.getCart)
router.post('/add-cartItem',validateController.authenticate,shopController.addCartItem);
router.delete('/delete-cartItem',validateController.authenticate,shopController.deleteCartItem);

module.exports=router;