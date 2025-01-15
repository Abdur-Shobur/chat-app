import ApiError from '../../../../errors/ApiError'
import { statusCodes } from '../../../../interfaces/error'
import UnitModel from '../message.model'

const destroy = async (payload: { id: string }): Promise<any | null> => {
  const { id } = payload

  // Validate the ID
  if (!id) {
    throw new ApiError(
      statusCodes.NO_CONTENT.code,
      statusCodes.NO_CONTENT.message
    )
  }

  // Perform the deletion operation
  const result = await UnitModel.findByIdAndDelete(id)

  // Check if the document was deleted
  if (!result) {
    throw new ApiError(statusCodes.NOT_FOUND.code, 'Customer not found.')
  }

  return result
}

export default destroy
