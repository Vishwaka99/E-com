const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart.cjs');

// Get cart by userId
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update cart
router.post('/:userId', async (req, res) => {
  try {
    const { items } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });
    
    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId: req.params.userId,
        items: items
      });
    } else {
      // Replace items
      cart.items = items;
    }
    
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
