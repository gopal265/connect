import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
const app = express();


app.use(bodyParser.json({limit: "20mb",extended:true}));
app.use(bodyParser.urlencoded({limit: "20mb",extended:true}));
app.use(cors());


app.use('/posts',postRoutes)
app.use('/auth',authRoutes)
app.use("/users",userRoutes)
let port = process.env.PORT || 5000;
const connection_Url = "mongodb+srv://gopalreddy:redyeye@firstcluster.byqzmdi.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(connection_Url)
.then(() =>
    app.listen(5000, () =>{
    console.log(`Server started at port : ${port}`)
    console.log("URL: http://localhost:5000");}))
.catch((err) => console.log(err))


