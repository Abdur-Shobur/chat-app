import { Request, Response } from 'express'
import { createSlug } from '../../../shared/helper'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { userService } from './user.service'
import { UserType } from './user.interface'
import bcrypt from 'bcrypt'
import { authData } from '../../middlewares/auth-info'
import { statusCodes } from '../../../interfaces/error'

/* get all-------------------------------------
    ?status= ApiStatusType 
    default set all in service
*/
const index = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.index()

  sendResponse<UserType[]>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: statusCodes.OK.message,
    data: result,
  })
})

/* store-------------------------------------
   
*/
const store = catchAsync(async (req: Request, res: Response) => {
  const password = await bcrypt.hashSync(req.body?.password, 12)
  const result = await userService.store({
    ...req.body,
    password: password,
  })

  if (result?.password) {
    delete result.password
  }

  sendResponse<UserType>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: 'User create successfully',
    data: result,
  })
})

/* show by id-------------------------------------
    view details 
*/
const show = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await userService.show(id)

  if (result?.password) {
    delete result.password
  }
  sendResponse<UserType>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: statusCodes.OK.message,
    data: result,
  })
})

/* update-------------------------------------
   
   not start yet
*/
const update = catchAsync(async (req: Request, res: Response) => {
  const { name, phone, email } = req.body
  const id = req.params.id
  const updateData: Partial<UserType> = {}

  if (name) updateData.name = name
  if (email) updateData.email = email
  if (phone) updateData.phone = phone

  const result = await userService.update({
    id,
    updateData: updateData as UserType,
  })

  sendResponse<UserType>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: statusCodes.OK.message,
    data: result,
  })
})

/* destroy-------------------------------------
    id from params
*/
const destroy = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await userService.destroy({ id })

  sendResponse<UserType>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: 'User Deleted successfully',
    data: result,
  })
})

/* update status-------------------------------------
    id from params
    status from body

*/
const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body
  const result = await userService.updateStatus({ id, status })

  // send
  sendResponse<UserType>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: 'Status Updated successfully',
    data: result,
  })
})

export const UserController = {
  index,
  store,
  show,
  update,
  destroy,
  updateStatus,
}
