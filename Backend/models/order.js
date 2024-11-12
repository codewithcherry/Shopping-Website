const mongoose = require('mongoose');

// Define Shipping Address schema
const shippingAddressSchema = new mongoose.Schema({
  fullName: String,
  doorNumber: String,
  streetArea: String,
  landmark: String,
  city: String,
  state: String,
  postalCode: Number,
  phoneNumber: Number,
});

// Mask card number function (e.g., 1234 5678 9123 4834 -> XXXX XXXX XXXX 4834)
function maskCardNumber(cardNumber) {
  return cardNumber.replace(/\d(?=\d{4})/g, 'X');
}

// Define the main Order schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ['Prepaid', 'COD'],
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ['Credit/Debit', 'Internet Banking', 'UPI', 'Wallet','COD'],
    required: true,
  },
  paymentDetails: {
    cardHolderName: {
      type: String,
    },
    maskedCardNumber: {
      type: String,
    },
    internetBankingBank: {
      type: String,
     
    },
    upiId: {
      type: String,
      
    },
    walletPhone: {
      type: String,
     
    },
    saveCard: {
      type: Boolean,
      default: false,
    },
    cardNumber: { // Temporary field for unmasked card number
      type: String,
      select: false, // Exclude from query results
    }
  },
  deliveryStatus: {
    type: String,
    enum: ['Ordered', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered'],
    default: 'Ordered',
  },
  orderStatus: {
    type: String,
    enum: ['successfull', 'pending', 'cancelled', 'processing'],
    default: 'processing',
  },
  estimatedDeliveryDate: {
    type: Date,  
  },
  transactionDetails: {
    utr: {
      type: String,
      default: () => `UTR${Math.floor(100000000 + Math.random() * 900000000)}`, // Generates a random UTR
    },
    transactionId: {
      type: String,
      default: () => `TXN${Math.floor(100000000 + Math.random() * 900000000)}`, // Generates a random transaction ID
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    title:String,
    quantity: Number,
    size: String,
  }],
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to handle estimated delivery date and mask card number
orderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.estimatedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    
    // Mask card number if payment mode is Credit/Debit
    if (this.paymentMode === 'Credit/Debit' && this.paymentDetails.cardNumber) {
      this.paymentDetails.maskedCardNumber = maskCardNumber(this.paymentDetails.cardNumber);
      this.paymentDetails.cardNumber = undefined; // Remove the unmasked card number
    }
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
