import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { userValidation, userValidationEdit } from './user.validation'
import { upload } from '../../../helpers'
import imageUpload from '../../middlewares/imageUpload'

const router = express.Router()

// get all
router.get('/', UserController.index)

// store

router.post(
  '/store',

  upload.single('image'),
  imageUpload(),
  validateRequest(userValidation),
  UserController.store
)
// update
router.put(
  '/update/:id',

  upload.single('image'),
  imageUpload(),
  validateRequest(userValidationEdit),
  UserController.update
)

// show
router.get('/:id', UserController.show)

// update status
router.put(
  '/status/:id',

  UserController.updateStatus
)

// delete by id
router.delete('/:id', UserController.destroy)

export const UserRoutes = router
