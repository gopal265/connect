import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    userEmailId:{
        type: String,
        required : true
    },
    otp : {
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 120,// this is the expiry time in seconds
      },
    
}) 

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;