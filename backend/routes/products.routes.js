import express from "express";
const router = express.Router();

import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/products.controller.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
