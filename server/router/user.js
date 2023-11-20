const router = require("express").Router();
const userControllers = require("../controllers/user.js")
const {verifyToken} = require("./verifytoken.js")

// register a user
router.post("/create/user",userControllers.register)
//verify email
router.post("/verify/email" , userControllers.verifyMail )
//Login
router.post("/login" ,userControllers.login)
//Forgot password
router.post("/forgot/password" ,userControllers.forgotPassword)
//reset password
router.put("/reset/password" ,userControllers.resetPassword )
//Following
router.put("/following/:id" , verifyToken , userControllers.following)
//Fetch post from following
router.get("/flw/:id" , verifyToken ,userControllers.fetchPostofFollowing)
//Update User Profile
router.put("/update/:id" , verifyToken , userControllers.updateProfile)
//Delete User account 
router.delete("/delete/:id" , verifyToken ,userControllers.deleteProfile)
//get user details for post
router.get("/post/user/details/:id" , userControllers.userDetails)
//get user to follow
router.get("/all/user/:id" ,userControllers.users)

module.exports = router;