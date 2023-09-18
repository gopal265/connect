import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import sendEmail from "../utils/sendMail.js";
import dotenv from "dotenv"
import OTP from "../models/otp.js";
dotenv.config();


// Register a new user
export const register = async (req,res) =>{

    try {
        const user = req.body
        const existuserName = await User.findOne({userName:user.userName})
        const existEmail = await User.findOne({email:user.email})
        if (existuserName || existEmail){
            return res.status(400).json({message:"UserName or Email already present."})
        }
        
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(user.password,salt)
        user.password = passwordHash

        const newUser = new User(user)
        const savedUser = await newUser.save()

        return res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({message:error})
    }

    


}


// login 

export const login = async (req,res) =>{
    try {
        const {email,password} = req.body

        const user = await User.findOne({email:email})

        if (!user){
            return res.status(400).json({message:"User is not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch){
           return  res.status(400).json({message:"Invalid Credentials"})
        }

        const token = jwt.sign({id : user._id,},process.env.JWT_SECRET)

        delete user.password

         return res.status(200).json({token,user})



    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// forgot password 
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
export const forgetPassword =  async(req,res) =>{

    try {
        const {email} = req.body
        const user = await  User.find({email})
        if (user.length === 0){
            return res.status(404).json({message:"User Not Found"})
        }
        else{
            const otp = generateOTP()
            sendEmail(user[0].email,"Pass word Reset",otp)
            const newOTp = new OTP({userEmailId:user[0].email,otp:otp})
            await newOTp.save()

            return res.status(201).json({message:`OTP sent`})

        }
    } catch (error) {
        res.status(404).json(error)
    }
}

// verify OTP
export const verifyOTP  = async(req,res) =>{
    try {
        const {otp,email} = req.body
        const otpTable = await  OTP.find({userEmailId:email})
        if (otpTable[0].otp != otp){
            return res.status(404).json({message:"Wrong OTP"})
        }
        

        res.status(200).json({message:'Verified'})
    } catch (error) {
        res.status(500).json(error)
    }
}

// reset Password
export const resetPassword = async (req,res) =>{
   try {
    const {email,password} = req.body
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password,salt)
    const newPassword = passwordHash
    const user = await User.findOne({email})
    if (user){
        user.password = newPassword
    }

    await user.save()
   
    
     return res.status(200).json({email,newPassword,user})
   } catch (error) {
     res.status(500).json(error)
   }
}
