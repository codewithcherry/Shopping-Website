const express=require("express");
const uploadController=require("../controllers/upload");
const multer=require('multer')

const router=express.Router()

// Set up Multer with memory storage
const storage = multer.memoryStorage();


// Filter files based on MIME type
const fileFilter = (req, file, cb) => {
    // Allowed MIME types
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
    if (allowedMimeTypes.includes(file.mimetype)) {
      // Accept the file if it's a valid type
      cb(null, true);
    } else {
      // Reject the file if it's not a valid type
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
}
    const upload = multer({ storage ,fileFilter});

router.post("/add-product-image", upload.single('image'),uploadController.uploadProductImage);
router.post("/add-review-image", upload.single('image'),uploadController.uploadReviewImage);

module.exports=router