const express=require("express");
const dotenv =require("dotenv");
const connectDB =require("./config/db");
const cors=require("cors");
dotenv.config();
connectDB();
const app=express();
const authRoutes=require("./routes/authroutes");
const userRoutes=require("./routes/userroutes");
const postRoutes=require("./routes/postroutes")
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("social media API in running in");
})
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/posts',postRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`)
});
