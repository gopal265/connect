import express from "express";
import {getUser,getUserFriends,addRemoveFriend,updateUser, searchUser, profileViewed, likedProfile} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js";


const router = express.Router()

router.get("/:id",verifyToken,getUser)
router.get("/:id/friends",verifyToken,getUserFriends)
router.get("/:username/search",searchUser)
router.patch("/:id",verifyToken,updateUser)
router.patch("/:id/:friendId",verifyToken,addRemoveFriend)
router.patch("/:id/profileviewed",verifyToken,profileViewed)
router.patch('/:id/:userLikedId/profileliked',verifyToken,likedProfile)

export default router