import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName : {
        type:String,
        required : true,
        min : 4,
        max:30
    },
    lastName :{
        type:String,
        required : true,
        min : 4,
        max:30
    },
    userName : {
        type:String,
        required : true,
        min : 5,
        max:30,
        unique : true
    },
    email :  {
        type : String,
        required : true,
        max : 50,
        unique : true

    },
    password :{
        type : String,
        required : true,
        min : 5,
        

    },
    picture : {
        type : String,
        default : ""
    },
    friends : {
        type : Array,
        default: []
    },
    socialProfile :{
        type : Array,
        default:[]
    },
    location : String,
    occupation : String,
    viewedProfile:{
        type:Number,
        default : 0
    },
    impressions:{
        type : Number,
        default : 0
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User;