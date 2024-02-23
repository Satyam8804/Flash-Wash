import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

import dotenv from 'dotenv'
dotenv.config({path:'./.env'})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error('Local file path is missing.');
    }

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // file has been uploaded successfully
    console.log("File is uploaded on Cloudinary:", response.url);

    // remove the locally saved temp file after successful upload
    fs.unlinkSync(localFilePath);
    console.log('Local file deleted successfully.');

    return response;
  } catch (error) {
    console.error('Error during file upload to Cloudinary:', error.message);

    // handle cleanup even if upload fails
    try {
      fs.unlinkSync(localFilePath);
      console.log('Local file deleted after upload failure.');
    } catch (cleanupError) {
      console.error('Error deleting local file:', cleanupError.message);
    }

    return null;
  }
};

export { uploadOnCloudinary };
