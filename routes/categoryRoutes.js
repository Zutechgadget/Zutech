const express = require("express");
const Category = require("../models/categoryModel");

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).json({ error: "Category name is required" });
    const category = new Category(req.body);
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error saving category" });
  }
});

module.exports = router;
