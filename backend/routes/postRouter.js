import express from "express";
import {
  getPosts,
  createPost,
  likePost,
  getLikedPost,
  getLikedPosts,
  getCreatedPosts,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/", likePost);
router.get("/liked/ids/:userId", getLikedPost);
router.get("/liked/:userId", getLikedPosts);
router.get("/:userId", getCreatedPosts);

export default router;
