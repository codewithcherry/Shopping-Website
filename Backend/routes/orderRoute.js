const express=require('express')
const router=express.Router()

const orderController=require('../controllers/order')
const validateController=require('../controllers/validate')

router.post("/place-order",validateController.authenticate,orderController.placeOrder)

module.exports=router