const express=require('express');
const validateController=require("../controllers/validate");
const router=express.Router()

router.get("/validate",validateController.validate)

module.exports=router