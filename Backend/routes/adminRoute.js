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
router.post('/edit-product-info',validateController.adminAuthenticate,adminController.editProductInfo);
router.post('/update-product-image',validateController.adminAuthenticate,adminController.updateProductImages);
router.get('/order-list',validateController.adminAuthenticate,adminController.getOrderlist);
router.get('/product-stock',validateController.adminAuthenticate,adminController.getProductStock);
router.post('/add-team',validateController.adminAuthenticate,adminController.createTeam);
router.get('/get-team-members',validateController.adminAuthenticate,adminController.getAdmins);
router.get('/get-admin',validateController.adminAuthenticate,adminController.getAdminData);
router.post('/update-admin',validateController.adminAuthenticate,adminController.updateAdminData);
router.delete('/delete-product/:productId',validateController.adminAuthenticate,adminController.deleteProduct);
router.post('/add-task',validateController.adminAuthenticate,adminController.addNewAdminTask);
router.get('/get-tasks',validateController.adminAuthenticate,adminController.getAdminTasks);
router.post('/update-pinned',validateController.adminAuthenticate,adminController.updateTaskPinned);
router.post('/update-starred',validateController.adminAuthenticate,adminController.updateTaskStarred);
router.post('/update-task-status',validateController.adminAuthenticate,adminController.updateTaskStatus);
router.delete('/delete-task',validateController.adminAuthenticate,adminController.deleteTask);

module.exports=router;