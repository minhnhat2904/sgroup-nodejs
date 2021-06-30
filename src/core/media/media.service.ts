import { cloudinary } from '../../config/cloudinaryStorage';

class Service {
    uploadToCloudinary = (file: any) => {
        return new Promise((resolve: CallableFunction, reject: CallableFunction) => {
            cloudinary.upload(file, (err: Error, image: any) => {
                if (err) {
                    return reject(err, null);
                } else {
                    const fs = require('fs');
                    fs.unlinkSync(file);
                    resolve(image.url, image.public_id);
                }
            });
        });
    }
}

export const UploadService = new Service();
