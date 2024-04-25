const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Product name must be provided"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
});

module.exports = mongoose.model("product", productSchema);
