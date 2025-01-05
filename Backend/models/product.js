const mongoose = require('mongoose');

// Define the Product schema with timestamps enabled
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String },
  brand: { type: String },
  category: { type: String },
  subCategory: { type: String },
  images: [{ type: String }], // Array of image URLs
  stockQuantity: { type: Number, default: 0 },
  status: { type: String, enum: ["in stock", "out of stock", "selling fast", "only few left"], default: "in stock" },
  flashSale:{ type: Boolean , default:false},
  bestSelling:{ type: Boolean, default:false},
  sku: { type: String },
  restockDate: { type: Date },
  basePrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true }, // Assuming frontend-calculated final price is passed
  sizes: [{ type: String }], // Array of strings for sizes, if applicable
  ratingsData: {
    type: [
      {
        rating: { type: Number, required: true }, // Rating value
        count: { type: Number, default: 0 },    // Count of users giving this rating
      },
    ],
    default: function () {
      return [
        { rating: 5, count: 0 },
        { rating: 4, count: 0 },
        { rating: 3, count: 0 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 },
      ];
    },
  },
  ratings: { type: Number, default: 0 }, // Average rating
  reviews:[
    {
      user:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
      username:{ type:String},
      imageUrl:{type:String},
      rating:{
        type:Number
      },
      reviewText:{type:String},
      images:[],
      likes:{
        type:Number,
        default:0
      },
      dislikes:{
        type:Number,
        default:0
      },
      date:{
        type: Date
      }
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // Reference to the User model
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }  // Reference to the User model
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Function to determine the product status based on stock quantity
function determineStatus(stockQuantity) {
  if (stockQuantity === 0) return "out of stock";
  if (stockQuantity < 20) return "only few left";
  if (stockQuantity < 50) return "selling fast";
  return "in stock";
}

// Pre-save middleware to set the status based on stock quantity
productSchema.pre('save', function (next) {
  this.status = determineStatus(this.stockQuantity);
  next();
});

// Pre-update middleware to set the status and updatedBy on each update
productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.$set) {
    // Update status based on new stock quantity, if provided
    if (update.$set.stockQuantity !== undefined) {
      update.$set.status = determineStatus(update.$set.stockQuantity);
    }
    // Set updatedBy field if provided in the update request
    if (update.$set.updatedBy) {
      this.set({ updatedBy: update.$set.updatedBy });
    }
  }
  next();
});

// Optional: Custom method to get update details including user tracking
productSchema.methods.getUpdateDetails = function () {
  return {
    lastUpdated: this.updatedAt,
    createdOn: this.createdAt,
    createdBy: this.createdBy,
    updatedBy: this.updatedBy
  };
};

// Function to calculate the average rating
function calculateAverageRating(ratingsData) {
  const totalRatings = ratingsData.reduce((acc, { rating, count }) => acc + rating * count, 0);
  const totalCount = ratingsData.reduce((acc, { count }) => acc + count, 0);
  return totalCount === 0 ? 0 : (totalRatings / totalCount).toFixed(2);
}

// Method to add a review
productSchema.methods.addReview = async function (review) {
  // Add the review to the reviews array
  this.reviews.push(review);

  // Find or create the rating entry in ratingsData
  const ratingEntry = this.ratingsData.find((item) => item.rating === review.rating);
  if (ratingEntry) {
    ratingEntry.count += 1; // Increment the count for the existing rating
  } else {
    this.ratingsData.push({ rating: review.rating, count: 1 }); // Add new rating entry
  }

  // Recalculate the average rating
  this.ratings = calculateAverageRating(this.ratingsData);

  // Save the updated product document
  await this.save();
};

productSchema.index({ title: "text" });

// Compile the Product model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
