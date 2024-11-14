const express=require('express')
const router=express.Router()

const orderController=require('../controllers/order')
const validateController=require('../controllers/validate')

router.post("/place-order",validateController.authenticate,orderController.placeOrder);
router.get("/get-user-orders",validateController.authenticate,orderController.getUserOrders);
router.post('/generate-invoice',validateController.authenticate,orderController.generateInvoice);

module.exports=router