const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  image: String,
  volume: String,
  quantity: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentMethod: {
    type: String,
    default: 'upi'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Processing'
  },
  paymentId: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
