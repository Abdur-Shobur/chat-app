import { NextFunction, Request, Response } from 'express'
import { uploadToCloudinary } from '../../helpers'
interface UploadResult {
  secure_url: string
}

const imageUpload =
  () =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const image = req.file?.path

      // If you need to upload the image to Cloudinary, you can do so here
      let uploadResult
      if (req.body.image_type === 'image' && image && req.file) {
        uploadResult = await uploadToCloudinary(req.file)
        req.body.image = uploadResult.secure_url
      }

      return next()
    } catch (error) {
      next(error)
    }
  }

export default imageUpload

/*
import { NextFunction, Request, Response } from 'express'
import { uploadToCloudinary } from '../../helpers'

// Middleware to handle image uploads and Cloudinary storage
const imageUpload =
  () =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Handle single 'image' upload
      if (req.body.image_type === 'image' && files['image'] && files['image'][0]) {
        const image = files['image'][0].path;
        const uploadResult = await uploadToCloudinary(files['image'][0]);
        req.body.image = uploadResult.secure_url; // Save the uploaded image URL in req.body
      }

      // Handle 'gallery_images' upload (multiple files)
      if (files['gallery_images'] && files['gallery_images'].length > 0) {
        const galleryImagesUrls = await Promise.all(
          files['gallery_images'].map(async (file) => {
            const uploadResult = await uploadToCloudinary(file);
            return uploadResult.secure_url; // Return Cloudinary URL
          })
        );
        req.body.gallery_images = galleryImagesUrls; // Save gallery image URLs in req.body
      }

      return next();
    } catch (error) {
      next(error);
    }
  }

export default imageUpload;

*/
