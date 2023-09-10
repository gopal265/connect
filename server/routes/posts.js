import express from "express"
import { getFeedPosts,createPost,getUserPosts,likePost, commentPost, deletePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/",getFeedPosts)
router.get("/:id",getUserPosts)
router.post("/",createPost)
router.patch("/:id",likePost)
router.patch("/:id/comments",commentPost)
router.delete("/:id",deletePost)


export default router;