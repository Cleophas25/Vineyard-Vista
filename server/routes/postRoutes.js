import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import auth from "../middleware/auth.js";
import {
  commentPost,
  createPost,
  deleteComment,
  deletePost,
  getComments,
  getPost,
  getPosts,
  stats,
  updatePost,
} from "../controllers/blogPostController.js";

const router = express.Router();

// ADMIN ROUTES
router.get("/adminStats", auth, stats);

// LIKE & COMMENT ON POST
router.post("/comment/:id", commentPost);

// GET POSTS ROUTES

router.route("/").get(getPosts).post(auth, createPost);
router.put("/:id", auth, updatePost);
router.get("/:postId", getPost);
router.get("/comments/:postId", getComments);

// DELETE POSTS ROUTES
router.delete("/:id", auth, deletePost);
router.delete("/comment/:id/:postId", deleteComment);

export default router;
