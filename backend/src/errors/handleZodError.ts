import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage, statusCodes } from '../interfaces/error'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    console.log(issue?.path, 'sdfsdf')
    return {
      path: issue?.path.slice(1).join('.'),
      message: issue?.message,
    }
  })

  return {
    statusCode: statusCodes.VALIDATION_ERROR.code,
    message: statusCodes.VALIDATION_ERROR.message,
    errorMessages: errors,
  }
}

export default handleZodError
