const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.Cloudinary_DomainName,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});


module.exports = {cloudinary };
