const cloudinary = require('cloudinary').v2;
const multer = require("multer");
const {cloudinaryStorage, CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async (req,file) =>{
        return {
            folder:'cbd03',
            public_key:file.fieldname+'_'+Date.now()
        }
    }
})

const multerObj = multer({storage: storage})

module.exports = multerObj;