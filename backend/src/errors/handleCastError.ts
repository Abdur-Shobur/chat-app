import mongoose from 'mongoose'
import { IGenericErrorMessage, statusCodes } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: statusCodes.BAD_REQUEST.message,
    },
  ]

  return {
    statusCode: statusCodes.BAD_REQUEST.code,
    message: statusCodes.BAD_REQUEST.message,
    errorMessages: errors,
  }
}

export default handleCastError
