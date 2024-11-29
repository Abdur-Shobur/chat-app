import { Request } from 'express'
import { JwtPayload, Secret } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { statusCodes } from '../../interfaces/error'
import UserModel from '../modules/user/user.model'
// import { logger } from '../../shared/logger'
import { ObjectId } from 'mongodb'
interface AuthPayload extends JwtPayload {
  _id: ObjectId
  email: string
  role_id: ObjectId
}

export const authData = async (req: Request): Promise<AuthPayload> => {
  // Get authorization token
  let token = req.headers.authorization

  if (!token) {
    throw new ApiError(
      statusCodes.UNAUTHORIZED.code,
      statusCodes.UNAUTHORIZED.message
    )
  }

  token = token.split(' ')[1]

  // Verify token
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  )

  // Check if the user exists
  const isUserExist = await UserModel.isUserExist(verifiedUser._id)

  if (!isUserExist) {
    // config.env === 'development' && logger.error('user not found')
    throw new ApiError(
      statusCodes.UNAUTHORIZED.code,
      statusCodes.UNAUTHORIZED.message
    )
  }

  return {
    _id: isUserExist._id,
    email: isUserExist.email,
  }
}
