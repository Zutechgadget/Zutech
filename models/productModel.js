const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  stock: { type: Number, required: true },
  description: String,
  image: String,
  price: Number,
  ratings: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
