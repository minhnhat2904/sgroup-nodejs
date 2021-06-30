import multer from 'multer';

const multerUploader = multer({ dest: 'uploads/'}).single('thumbnail');

export {multerUploader};