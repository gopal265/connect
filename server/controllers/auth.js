import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/users.js";


// Register a new user
export const register = async (req,res) =>{

    try {
        const user = req.body
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(user.password,salt)
        user.password = passwordHash

        const newUser = new User(user)
        const savedUser = await newUser.save()

        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({error:error.message})
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

        const token = jwt.sign({id : user._id,},"dontotrytosee")

        delete user.password

         return res.status(200).json({token,user})



    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

