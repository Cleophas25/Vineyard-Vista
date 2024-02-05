import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

import {
  register,
  login,
  logout,
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
  resetPassword,
  updateProfile,
} from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/reset-password", auth, resetPassword);
router.put("/profile", auth, updateProfile);

// Admin Routes
router.get("/", auth, getAllUsers);
router.route("/:id", auth).get(getUser).put(updateUser).delete(deleteUser);

export default router;
