const express=require("express");
const authController=require("../controllers/auth");
const router=express.Router();

router.post('/register',authController.registerAccount);
router.post("/login",authController.loginToAccount);
router.post('/forgot-password',authController.forgotPassword);
router.post('/update-password',authController.updatePassword);

module.exports=router