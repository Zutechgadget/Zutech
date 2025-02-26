const mongoose = require('mongoose');
const express = require('express');
const next = require('next');

// Import routes for categories and products
const categoryRoute = require('./src/app/api/products/routes/categorys');
const productRoute = require('./src/app/api/products/routes/products');

// MongoDB connection
mongoose.connect('mongodb://localhost/apple')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware to parse JSON bodies
  server.use(express.json());

  // API routes
  server.use('/api/categorys', categoryRoute);  // Category route
  server.use('/api/products', productRoute); // Ensure this line exists and is correct
  // Product route

  // Handle all other requests via Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server on port 3000
  server.listen(3500, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3500');
  });
});
