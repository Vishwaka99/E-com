const express = require('express');
const router = express.Router();
const Order = require('../models/Order.cjs');
const Cart = require('../models/Cart.cjs');

// Place a new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod, totalAmount, paymentId } = req.body;
    
    // Create new order
    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentId
    });
    
    const savedOrder = await newOrder.save();
    
    // Clear the cart for the user
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );
    
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user orders
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
