const { cloudinary } = require("../database/cloudinary");

exports.uploadProductImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Create a sanitized public ID (replace spaces with underscores)
  const sanitizedPublicId = `${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;

  // Get the current timestamp
  const timestamp = Math.floor(Date.now() / 1000); // current time in seconds

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'ProductImages/',    // Specify custom folder
      public_id: sanitizedPublicId, // Use the sanitized public ID
      timestamp: timestamp          // Correctly include the timestamp
    },
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      // Send the result back to the client
      res.json({
        message: 'File uploaded successfully',
        imageUrl: result.secure_url, // URL to the uploaded image
        publicId: result.public_id,   // Public ID for future reference
      });
    }
  );

  // Send the buffer to Cloudinary
  uploadStream.end(req.file.buffer);
};


exports.uploadReviewImage=async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Create a sanitized public ID (replace spaces with underscores)
  const sanitizedPublicId = `${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;

  // Get the current timestamp
  const timestamp = Math.floor(Date.now() / 1000); // current time in seconds

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'ProductReviewImages/',    // Specify custom folder
      public_id: sanitizedPublicId, // Use the sanitized public ID
      timestamp: timestamp          // Correctly include the timestamp
    },
    (error, result) => {
      if (error) {
        return res.status(500).json({ type: "error",message:"error uploading image" });
      }
      // Send the result back to the client
      res.json({
        message: 'File uploaded successfully',
        imageUrl: result.secure_url, // URL to the uploaded image
        publicId: result.public_id,   // Public ID for future reference
      });
    }
  );

  // Send the buffer to Cloudinary
  uploadStream.end(req.file.buffer);
};

exports.uploadUserImage=async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Create a sanitized public ID (replace spaces with underscores)
  const sanitizedPublicId = `${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;

  // Get the current timestamp
  const timestamp = Math.floor(Date.now() / 1000); // current time in seconds

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'ProfileImages/',    // Specify custom folder
      public_id: sanitizedPublicId, // Use the sanitized public ID
      timestamp: timestamp          // Correctly include the timestamp
    },
    (error, result) => {
      if (error) {
        return res.status(500).json({ type: "error",message:"error uploading image" });
      }
      // Send the result back to the client
      res.json({
        message: 'File uploaded successfully',
        imageUrl: result.secure_url, // URL to the uploaded image
        publicId: result.public_id,   // Public ID for future reference
      });
    }
  );

  // Send the buffer to Cloudinary
  uploadStream.end(req.file.buffer);
};