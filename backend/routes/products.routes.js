import express from "express";
const router = express.Router();

import {
  getProductById,
  getProducts,
  createProduct,
} from "../controllers/products.controller.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get("/:id", getProductById);

export default router;
