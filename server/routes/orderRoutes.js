import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getSingleOrder,
  updateOrder,
  //   payOrder
} from "../controllers/orderController.js";

router.route("/").get(getAllOrders).post(auth, createOrder);
router.get("/mine", auth, getMyOrders);
router
  .route("/:id", auth)
  .get(getSingleOrder)
  .delete(deleteOrder)
  .put(updateOrder);

// router.put("/:id/pay", auth, payOrder);

export default router;
