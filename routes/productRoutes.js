const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, category, stock, description, image, price, ratings } = req.body;

    if (!name || !category || !stock || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = new Product({ name, category, stock, description, image, price, ratings });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error saving product" });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product details" });
  }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
