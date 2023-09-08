import express from "express"
import { getFeedPosts,createPost,getUserPosts,likePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/",getFeedPosts)
router.get("/:id",getUserPosts)
router.post("/",createPost)
router.patch("/:id",likePost)


export default router;