const User=require("../models/user");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");

exports.register=async(req,res)=>{
    const{username,email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"used already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser =await User.create({
            username,
            email,
            password:hashedPassword
        });
        return res.status(200).json({message:"user resister succesfully"})
    }catch(error){
         return res.status(500).json({message:"an error occured"});
    }
}


exports.login=async(req,res)=>{
    const{email,password}=req.body;
    try{
       const user=await User.findOne({email});
       if(!user){
        return res.status(400).json({message:"invalid credentials"})
       }
         const isMatch= await bcrypt.compare(password,user.password);
         if(!isMatch)return res.status(400).json({mesage:"invalid process"});
         const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"1d"
         });
         res.json({token});
    }
    catch(error){
    return res.status(500).json({message:"an error occured during login"})
    }
}