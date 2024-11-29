/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb'
import { UnitType } from '../unit.interface'
import UnitModel from '../unit.model'
import { statusCodes } from '../../../../interfaces/error'
import ApiError from '../../../../errors/ApiError'

const update = async (
  id: string,
  payload: UnitType
): Promise<UnitType | null> => {
  // Validate the id
  if (!ObjectId.isValid(id)) {
    throw new ApiError(
      statusCodes.NO_CONTENT.code,
      statusCodes.NO_CONTENT.message
    )
  }

  // Exclude fields from payload
  const { ...updateData } = payload

  // Check if updateData is empty
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(
      statusCodes.NO_CONTENT.code,
      statusCodes.NO_CONTENT.message
    )
  }

  const result = await UnitModel.findByIdAndUpdate(
    id,
    { $set: updateData }, // Update with the filtered data
    { new: true } // Return the updated document
  )

  // Handle case where document is not found
  if (!result) {
    throw new ApiError(
      statusCodes.NOT_FOUND.code,
      statusCodes.NOT_FOUND.message
    )
  }
  return result
}

export default update
