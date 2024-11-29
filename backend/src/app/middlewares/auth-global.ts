import { NextFunction, Request, Response } from 'express'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import UserModel from '../modules/user/user.model'
import { statusCodes } from '../../interfaces/error'
// import { logger } from '../../shared/logger'

/* use here authGlobal()
---------------
    * sidebar get /privet 
 
*/
// global auth for just check token and user
export const authGlobal =
  () =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
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

      next()
    } catch (error) {
      next(error)
    }
  }
