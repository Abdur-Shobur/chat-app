import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { statusCodes } from '../../../interfaces/error'
 import { authData } from '../../middlewares/auth-info'
import Service from './service'
import { UnitType } from './unit.interface'

/* get all-------------------------------------
    ?status= ApiStatusType 
    default set all in service
*/
const index = catchAsync(async (req: Request, res: Response) => {
   const result = await Service.index( )

  sendResponse<UnitType[]>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: statusCodes.OK.message,
    data: result,
  })
})

/* store-------------------------------------
   
*/
const store = catchAsync(async (req: Request, res: Response) => {
  const { _id } = await authData(req)
  const result = await Service.store({
    ...req.body,
    created_by: _id,
  })

  sendResponse<UnitType>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: 'Customer create successfully',
    data: result,
  })
})

/* show by id-------------------------------------
    view details 
*/
const show = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await Service.show(id)

  sendResponse<UnitType>(res, {
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
  const data = req.body
  const id = req.params.id

  const result = await Service.update(id, data as UnitType)

  sendResponse<UnitType>(res, {
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
  const result = await Service.destroy({ id })

  sendResponse<UnitType>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: 'Customer Deleted successfully',
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

  const result = await Service.updateStatus({ id, status })

  // send
  sendResponse<UnitType>(res, {
    statusCode: statusCodes.OK.code,
    success: true,
    message: 'Status Updated successfully',
    data: result,
  })
})
const Controller = {
  index,
  store,
  show,
  update,
  destroy,
  updateStatus,
}

export default Controller
