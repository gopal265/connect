import express from "express";
import {register,login, forgetPassword,verifyOTP,resetPassword} from "../controllers/auth.js"


const router = express.Router()


router.post("/register",register)
router.post('/login',login)
router.post('/forgetpassword',forgetPassword)
router.post('/verifyotp',verifyOTP)
router.patch('/resetpassword',resetPassword)


export default router;