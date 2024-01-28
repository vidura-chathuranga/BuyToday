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
    { name, price, description, image, brand, category, countInStock },
    { new: true }
  );

  if (updatedProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc delete a product
// @route DELETE /api/products/:id
// @access private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // get product Id
  const { id: productId } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (deletedProduct) {
    res.status(200).json(deletedProduct);
  } else {
    res.status(500);
    throw new Error("Product not found");
  }
});

// @desc create a new review
// @route POST /api/products/:id/review
// @access private
const createProductReview = asyncHandler(async (req, res) => {
  // get product Id
  const { id: productId } = req.params;

  // get review data from request body
  const { rating, comment } = req.body;

  const product = await Product.findOne({ _id: productId });

  if (product) {
    const alreadyReviwed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    console.log(alreadyReviwed);

    if (alreadyReviwed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    // update the reviewed count of the product
    product.numReviews = product.reviews.length;

    // update the product total ratings
    product.rating =
      product.reviews.reduce(
        (accumilator, review) => accumilator + review.rating,
        0
      ) / product.reviews.length;

    // save the updated product details
    await product.save();

    res.status(201).json({ message: "Product added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview
};
