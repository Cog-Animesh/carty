const cloudinary = require('cloudinary').v2;
const multer = require("multer");
const {cloudinaryStorage, CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:'dvxwe0w2j',
    api_key:'155678799469675',
    api_secret:'nhYXUsCGmpaHOp6OCl8ScC-ZVQQ'
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