
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});


const uploadOnCloundinary =  async (localFilePath) => {

    try {
        if(!localFilePath) return null
        //upload the file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        //File has been successfully uploaded 
        console.log("File is updloaded on cloundinary", response.url)
    } catch (error) {
        fs.unlinkSync(localFilePath) // removed the localcally saved  temporary file as the upload operation got failed 
        return null;
    }
}

export {uploadOnCloundinary}















