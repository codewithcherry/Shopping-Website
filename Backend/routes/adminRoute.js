const express=require("express");
const adminController=require('../controllers/admin');
const shopController=require('../controllers/shop')
const validateController=require("../controllers/validate");
const router=express.Router();

router.post("/login",adminController.adminLogin);
router.get("/dashboard",validateController.adminAuthenticate,adminController.getDashboard);
router.get("/products",validateController.adminAuthenticate,adminController.getProducts);
router.get('/get-product/:productId',validateController.adminAuthenticate,shopController.getProductDetails);
router.post("/add-product",validateController.adminAuthenticate,adminController.addProduct);
router.get('/order-list',validateController.adminAuthenticate,adminController.getOrderlist);
router.post('/add-team',validateController.adminAuthenticate,adminController.createTeam);
router.get('/get-team-members',validateController.adminAuthenticate,adminController.getAdmins);

module.exports=router;