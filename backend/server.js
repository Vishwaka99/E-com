require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.warn("WARNING: MONGODB_URI is not defined. Database features will fail.");
}

// Routes
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('LubriMax E-commerce API is running');
});

// Export for serverless
module.exports = app;

// Start server (only if not in serverless environment)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
