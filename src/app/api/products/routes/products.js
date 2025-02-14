const { Category } = require('../models/category');
const { Product, validate } = require('../models/product');
const express = require('express');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort('name');
        res.send(products);
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

// Create a new product
router.post('/', async (req, res) => {
    // Validate input using Joi
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // Check if category exists
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send('Invalid category ID');

        // Create new product with proper mapping
        const product = new Product({
            name: req.body.name,
            category: req.body.category,  // Use the 'category' field here
            stock: req.body.stock,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            ratings: req.body.ratings
        });

        const savedProduct = await product.save();

        // Populate category details in response
        const populatedProduct = await Product.findById(savedProduct._id)
            .populate('category', 'name -_id');

        res.send(populatedProduct);
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

// Update product details
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                category: req.body.category,  // Update with category
                stock: req.body.stock,
                description: req.body.description,
                image: req.body.image,
                price: req.body.price,
                ratings: req.body.ratings
            },
            { new: true }
        );
        if (!product) return res.status(400).send('Product with the given ID not found');
        res.send(product);
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(400).send('Product with the given ID not found');
        res.send(product);
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(400).send('Product with the given ID not found');
        res.send(product);
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

module.exports = router;
