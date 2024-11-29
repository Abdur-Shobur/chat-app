import { v2 as cloudinary } from 'cloudinary'
import multer, { FileFilterCallback } from 'multer'
import * as fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction, Express } from 'express'

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'daegifuhy',
  api_key: '923738269551678',
  api_secret: 'om50zN0bXChWrKT_aOwshhmUju8',
})

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/') // Temporary upload directory
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname) // Unique file name
  },
})

// File filter to only allow image uploads
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only images are allowed.')) // Reject non-image files
  }
}

// Multer upload setup to handle both single and multiple files
export const upload = multer({ storage: storage, fileFilter: fileFilter })
interface UploadResult {
  secure_url: string
}
// Upload file to Cloudinary and remove it from the local server
export const uploadToCloudinary = async (
  file: Express.Multer.File
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const publicId = path.parse(file.originalname).name

    cloudinary.uploader.upload(
      file.path,
      {
        public_id: publicId,
      },
      (error, result) => {
        // Remove the file from local storage after Cloudinary upload
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }

        if (error) {
          reject(error) // Handle upload errors
        } else {
          resolve(result as UploadResult)
        }
      }
    )
  })
}

// Middleware to handle both the main image and gallery images
export const imageUploadGallery = upload.fields([
  { name: 'image', maxCount: 1 }, // Single main image
  { name: 'gallery_images', maxCount: 10 }, // Multiple gallery images (up to 10)
])

// Image upload middleware to upload files to Cloudinary
export const imageUploadHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mainImage = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )?.['image']?.[0]

    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const galleryImages = files?.['gallery_images']
    // Upload the main image to Cloudinary
    if (mainImage) {
      const mainImageResult = await uploadToCloudinary(mainImage)
      req.body.image = mainImageResult.secure_url // Store main image URL in req.body
    }

    // Upload multiple gallery images to Cloudinary
    if (galleryImages && galleryImages.length > 0) {
      const galleryUrls: string[] = []

      // Loop through gallery images and upload each to Cloudinary
      for (const file of galleryImages) {
        const galleryImageResult = await uploadToCloudinary(file)
        galleryUrls.push(galleryImageResult.secure_url) // Store each image URL
      }

      req.body.gallery_images = galleryUrls // Store all gallery image URLs in req.body
    }

    return next() // Proceed to the next middleware/controller
  } catch (error) {
    next(error) // Pass any error to the error handler
  }
}
