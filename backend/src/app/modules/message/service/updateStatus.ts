import ApiError from '../../../../errors/ApiError'
import { statusCodes } from '../../../../interfaces/error'
import UnitModel from '../message.model'

const updateStatus = async (payload: { id: string }): Promise<any | null> => {
  const { id } = payload

  // Verify if the document exists
  const existingDocument = await UnitModel.findById(id)

  if (!existingDocument) {
    throw new ApiError(statusCodes.NOT_FOUND.code, 'Customer not found.')
  }

  // Construct the update query and update object
  const updateQuery = { _id: id }

  // Perform the update operation
  const result = await UnitModel.updateOne(updateQuery)

  // Check if the document was modified
  if (result.matchedCount === 0) {
    throw new ApiError(statusCodes.NOT_FOUND.code, 'Document not found.')
  }

  if (result.modifiedCount === 0) {
    throw new ApiError(
      statusCodes.SERVICE_UNAVAILABLE.code,
      'No changes were made.'
    )
  }

  return result
}

export default updateStatus
