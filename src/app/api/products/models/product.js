const mongoose = require('mongoose');
const Joi = require('joi');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {  // Changed to 'category', not 'categoryId'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    image: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    ratings: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Update the validation function to match category field
function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(5).max(1024).required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().min(5).max(255).required(),
        category: Joi.string().required(),  // Updated to 'category' field
        stock: Joi.number().required().min(0).max(255),
        ratings: Joi.number().required().min(0).max(5)
    });

    return schema.validate(product);
}

// Export the Product model and validate function
exports.Product = Product;
exports.validate = validateProduct;
