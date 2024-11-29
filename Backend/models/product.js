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
  sku: { type: String },
  restockDate: { type: Date },
  basePrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true }, // Assuming frontend-calculated final price is passed
  sizes: [{ type: String }], // Array of strings for sizes, if applicable
  reviews:[
    {
      user:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
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

// Compile the Product model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
