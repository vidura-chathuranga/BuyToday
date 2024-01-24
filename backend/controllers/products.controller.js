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

// @desc create a product
// @route POST /api/products
// @access private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
    category: "Sample category",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update a product details
// @route PUT /api/products/:id
// @access private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // get product Id
  const { id: productId } = req.params;

  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { name, price, description, image, brand, category, countInStock},
    { new: true }
  );

  if(updatedProduct){
    res.status(200).json(updatedProduct);
  }else{
    res.status(404);
    throw new Error("Product not found");
  }
});
export { getProducts, getProductById, createProduct,updateProduct };
