const express=require('express');
const shopController=require("../controllers/shop");
const validateController=require('../controllers/validate');

const router=express.Router()

router.get("/",shopController.getHome);
router.get("/cart",validateController.validate,shopController.getCart)

module.exports=router;