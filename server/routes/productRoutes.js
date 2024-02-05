import express from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();

import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  submitReview,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";


router.get("/", getAllProducts);
router.post("/", auth, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .put(auth, updateProduct);
router.post("/:id/review", submitReview);

export default router;
