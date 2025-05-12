import express from "express";
const router = express.Router();
const productController = require("./product.controller");

// Add a new product
router.post("/", productController.addProduct);

// Get all products
router.get("/", productController.getProducts);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;