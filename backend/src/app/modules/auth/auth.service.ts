import httpStatus from 'http-status'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import bcrypt from 'bcrypt'

import {
  IChangePassword,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import UserModel from '../user/user.model'
import { statusCodes } from '../../../interfaces/error'
import { userService } from '../user/user.service'

const loginUser = async (payload: {
  email: string
  password: string
}): Promise<ILoginUserResponse> => {
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await UserModel.isUserExist(payload.email)

  if (!isUserExist) {
    throw new ApiError(
      statusCodes.NOT_FOUND.code,
      statusCodes.NOT_FOUND.message
    )
  }
  const { _id, email } = isUserExist

  if (
    isUserExist.password &&
    !(await UserModel.isPasswordMatched(payload.password, isUserExist.password))
  ) {
    throw new ApiError(statusCodes.UNAUTHORIZED.code, 'password is not correct')
  }

  //create access token & refresh token

  const accessToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
  }
}
const registerUser = async (payload: {
  email: string
  password: string
  name: string
  phone: string
}): Promise<ILoginUserResponse> => {
  const password = await bcrypt.hashSync(payload.password, 12)
  const result = await userService.store({
    email: payload.email,
    name: payload.name,
    password: password,
    phone: payload.phone,
  })

  if (!result) {
    throw new ApiError(statusCodes.BAD_REQUEST.code, 'Failed to register')
  }

  const accessToken = jwtHelpers.createToken(
    { _id: result._id, email: result.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { _id: result._id, email: result.email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }
  const { email } = verifiedToken

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await UserModel.isUserExist(email)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way
  const isUserExist = await UserModel.findOne({ id: user?.userId }).select(
    '+password'
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await UserModel.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect')
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // data update
  isUserExist.password = newPassword

  // updating using save()
  isUserExist.save()
}
/*

const forgotPass = async (payload: { id: string }) => {
  const user = await UserModel.findOne({ id: payload.id }, { id: 1, role: 1 })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!')
  }

  let profile = null

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pofile not found!')
  }

  const passResetToken = await jwtHelpers.createResetToken(
    { id: user.id },
    config.jwt.secret as string,
    '50m'
  )

  const resetLink: string = config.resetlink + `token=${passResetToken}`

  await sendEmail(
    // profile.email,
    `
      <div>
        <p>Hi, ${profile.name.firstName}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `
  )

  // return {
  //   message: "Check your email!"
  // }
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const { id, newPassword } = payload
  const user = await UserModel.findOne({ id }, { id: 1 })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const isVarified = await jwtHelpers.verifyToken(
    token,
    config.jwt.secret as string
  )

  const password = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds)
  )

  await User.updateOne({ id }, { password })
}
*/
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  registerUser,
  // forgotPass,
  // resetPassword,
}
