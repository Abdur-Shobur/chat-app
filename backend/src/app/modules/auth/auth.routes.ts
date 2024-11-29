import express from 'express'
import { authGlobal } from '../../middlewares'
import validateRequest from '../../middlewares/validateRequest'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'
const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
)
router.post(
  '/register',
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.registerUser
)

router.get('/refresh-token', AuthController.refreshToken)

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  authGlobal(),
  AuthController.changePassword
)
router.post('/forgot-password', AuthController.forgotPass)

router.post('/reset-password', AuthController.resetPassword)

export const AuthRoutes = router
