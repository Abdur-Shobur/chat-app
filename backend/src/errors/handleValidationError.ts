import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage, statusCodes } from '../interfaces/error'
import { MongoServerError } from 'mongodb'
const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )

  return {
    statusCode: statusCodes.VALIDATION_ERROR.code,
    message: statusCodes.VALIDATION_ERROR.message,
    errorMessages: errors,
  }
}

export default handleValidationError

export const handleUniqueValueError = (
  error: MongoServerError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = []

  if (error.keyValue) {
    for (const key in error.keyValue) {
      if (Object.prototype.hasOwnProperty.call(error.keyValue, key)) {
        errors.push({
          path: key,
          message: `${key} must be unique. Value ${error.keyValue[key]} already exists.`,
        })
      }
    }
  }

  return {
    statusCode: statusCodes.VALIDATION_ERROR.code,
    message: statusCodes.CONFLICT.message,
    errorMessages: errors,
  }
}
