const express=require("express");
const adminController=require('../controllers/admin');
const validateController=require("../controllers/validate");
const router=express.Router();

router.post("/login",adminController.adminLogin);
router.get("/dashboard",validateController.adminAuthenticate,adminController.getDashboard);
router.post("/add-product",validateController.adminAuthenticate,adminController.addProduct);

module.exports=router;