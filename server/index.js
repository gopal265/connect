import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"

dotenv.config()
const app = express();


app.use(bodyParser.json({limit: "20mb",extended:true}));
app.use(bodyParser.urlencoded({limit: "20mb",extended:true}));
app.use(cors());


app.use('/posts',postRoutes)
app.use('/auth',authRoutes)
app.use("/users",userRoutes)
let port = process.env.PORT || 5000;
const connection_Url = process.env.CONNECTION_URL

mongoose.connect(connection_Url)
.then(() =>
    app.listen(port, () =>{
    console.log(`Server started at port : ${port}`)
    }))
.catch((err) => console.log(err))


