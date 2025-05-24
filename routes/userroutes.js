const express=require("express");

const router=express.Router();

const authMiddleware=require("../middleware/authmiddlewera");
const{followUser,unFollowUser}=require("../controllers/usercontroller");

router.post('/:id/follow',authMiddleware,followUser);
router.post('/:id/unFollow',authMiddleware,unFollowUser);

module.exports=router;
