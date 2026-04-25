const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  brand: {
    type: String
  },
  volume: {
    type: String
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
