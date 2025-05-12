import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  birdType: { type: String, required: true },
  productType: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  totalValue: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);