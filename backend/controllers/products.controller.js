import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.model.js";

// @desc Fetch all product Items
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// @desc Fetch product item by its id
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


export {
    getProducts,
    getProductById
}