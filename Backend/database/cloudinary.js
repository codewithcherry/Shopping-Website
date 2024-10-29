const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.Cloudinary_DomainName,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});

// Configure storage for multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productsImages', // Optional folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg','png'],
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
