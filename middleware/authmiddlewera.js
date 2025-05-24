const jwt =require("jsonwebtoken");

const User=require("../models/user");

const authMiddleware=async(req,res,next)=>{

    const authHeader=req.headers.authrization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"Unauthrized no token deined"})
    }

    const token=authHeader.split(" ")[1];
    try
    {
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
       req.user=await User.findById(decoded._id).select("password");
       next();
    }catch(error){
        return res.status(500).json({message:"Token is not valid"})
    }
        
}
module.exports=authMiddleware;