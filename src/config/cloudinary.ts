const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
import {envConfig} from '../env';

cloudinary.config({
  cloud_name: envConfig.get('CLOUDINARY_NAME'),
  api_key: envConfig.get('CLOUNDINARY_KEY'),
  api_secret: envConfig.get('CLOUDINARY_SECRET')
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req : any, file : any, cb : any) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;