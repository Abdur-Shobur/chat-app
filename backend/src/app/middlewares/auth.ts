import { NextFunction, Request, Response } from 'express'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'

import { statusCodes } from '../../interfaces/error'
// import { logger } from '../../shared/logger'

export const auth =
  () =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get authorization token
      let token = req.headers.authorization
      // console.log(
      //   JSON.stringify(req.body, null, 2),
      //   'body [middleware/auth.ts]'
      // )
      // console.log(req.files, 'files [middleware/auth.ts]')

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

      next()
    } catch (error) {
      next(error)
    }
  }
