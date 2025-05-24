const User=require("../models/user");

//follow user
exports.folllowUser=async(req,res)=>{
    try{
   const userToFollow=await User.findById(req.prams.id);
   const currentUser=await User.findById(req.user._id);
   if(!userToFollow)return res.status(400).json({message:"user not found"});

   if(currentUser.following.includes(userToFollow._id))return res.status(400).json({message:"you are alredy following this user"});

   currentUser.following.push(userToFollow._id);
   userToFollow.followers.push(currentUser._id);
   await currentUser.save();
   await userToFollow.save();
   return res.status(200).json({messsage:"apne ak user ko follow kiya"})

    }catch(error){
       console.log(error);
       return res.status(500).json({message:"an unknown error occccured in catch block"});
    }
}

//unfollow user
exports.unFollow=async(req,res)=>{
    try{
       const userToUnfollow=await User.findById(req.params.id);
       const currentUser=await User.findById(req.user._id);
       if(!userToUnfollow)return res.status(400).json({message:"User not fond"});
       if(!currentUser.following.includes(userToUnfollow._id)){return res.status(400).json({message:"you area not followinf=g this user"})
    }
currentUser.following=currentUser.following.filter((userId)=>userId.toString() !==userToUnfollow._id.toString())

userToUnfollow.followers=userToUnfollow.followers.filter((userId)=>userId.toString()!==currentUser._id.toString());

await  currentUser.save();
await userToUnfollow.save();

return res.json({message:"you have unfollowed a user ||kahe gussa  ho gayebhai usse"})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"An error occured during unfollowi ng an user"})
    }
}