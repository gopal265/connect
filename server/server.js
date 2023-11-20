const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const userRouter = require("./router/user");
const PostRouter = require("./router/Post")
const cors = require("cors");
dotenv.config();


mongoose.connect(process.env.CONNECTION_URL).then(()=>
console.log("DB connection successfull")).catch(()=>{
          console.log("Some error occured")
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/user" , userRouter);
app.use("/api/post" , PostRouter )

app.listen(process.env.PORT , ()=>{
          console.log("Server is running")
})