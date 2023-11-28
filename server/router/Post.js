const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { verifyToken } = require("./verifytoken");
const postControllers = require("../controllers/post.js")

//Create Post
router.post("/user/post" , verifyToken ,postControllers.createPost)

//upload post by one user
router.get("/get/post/:id" ,postControllers.getPosts)

//update user post
router.put("/update/post/:id" , verifyToken , postControllers.updatePost)

//Like
router.put("/:id/like" ,verifyToken,postControllers.likePost)
//Dislike
router.put("/:id/dislike" ,verifyToken,postControllers.dislikePost)

//Comment 
router.put("/comment/post" , verifyToken ,postControllers.commentPost)

//Delete post 
router.delete("/delete/post/:id" , verifyToken ,postControllers.deletePost)

/// Get a Following user
router.get("/following/:id" ,postControllers.getFollowingUser)

/// Get a Follower user
router.get("/followers/:id" , postControllers.getFollowerUser)

module.exports = router;