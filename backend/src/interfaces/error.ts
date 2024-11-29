export type IGenericErrorMessage = {
  path: string | number
  message: string
}

// statusCodes.ts

export type StatusCode = {
  code: number
  message: string
}

export const statusCodes = {
  OK: { code: 200, message: 'Success' },
  CREATED: { code: 201, message: 'Resource created' },
  ACCEPTED: { code: 202, message: 'Request accepted' },
  NO_CONTENT: { code: 204, message: 'No content' },
  BAD_REQUEST: { code: 400, message: 'Bad request' },
  UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
  FORBIDDEN: { code: 403, message: 'Forbidden' },
  VALIDATION_ERROR: { code: 422, message: 'Validation Error' },
  NOT_FOUND: { code: 404, message: 'Not found' },
  CONFLICT: { code: 409, message: 'Conflict' },
  INVALID_DATA: { code: 410, message: 'Data is not valid' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal server error' },
  SERVICE_UNAVAILABLE: { code: 503, message: 'Service unavailable' },
  // Add more status codes as needed
} as const

export type StatusCodes = (typeof statusCodes)[keyof typeof statusCodes]
