const multer= require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const cloudinary= require("../config/cloudinary");
// Allowed Formates
const allowedFormats= ['image/jpeg','image/png','image/jpg','image/svg','image/gif','video/mp4','application/pdf','audio/mpeg']

const storage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"socialmedia/uploads",
        resource_type:"auto",
        allowed_formats:['jpg','jpeg','png','svg','mp4','pdf','mp3']
    }
})

const fileFilter= (req,file,cb)=>{
    if(allowedFormats.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Unsupported file type"),false);
    }
}

const upload= multer({storage,fileFilter});
module.exports=upload;