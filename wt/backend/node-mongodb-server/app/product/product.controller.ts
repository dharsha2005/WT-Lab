import { Request, Response } from "express";
const Product = require("./product.model");

// Add a new product
exports.addProduct = async (req: Request, res: Response) => {
  try {
    const { birdType, productType, quantity, pricePerUnit } = req.body;
    const totalValue = quantity * pricePerUnit;

    const product = new Product({
      birdType,
      productType,
      quantity,
      pricePerUnit,
      totalValue,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Get all products
exports.getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Delete a product
exports.deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};