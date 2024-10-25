const express=require("express");
const authController=require("../controllers/auth");
const router=express.Router();

router.post('/register',authController.registerAccount);
router.post("/login",authController.loginToAccount);

module.exports=router