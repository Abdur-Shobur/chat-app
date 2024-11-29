import mongoose from 'mongoose'

import ApiError from '../../../../errors/ApiError'
import { statusCodes } from '../../../../interfaces/error'
import { UnitType } from '../unit.interface'
import UnitModel from '../unit.model'

const show = async (id: string): Promise<UnitType | null> => {
  // Validate the ID
  if (!id) {
    throw new ApiError(statusCodes.NO_CONTENT.code, 'ID is required.')
  }

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(statusCodes.BAD_REQUEST.code, 'Invalid ID format.')
  }

  const pipeline = [
    // Match the document by _id
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },

    // Lookup to join data from the UserModel (assuming 'users' collection)
    {
      $lookup: {
        from: 'users', // Collection name of the user model
        localField: 'created_by', // Field in current collection
        foreignField: '_id', // Field in 'users' collection
        as: 'created_by_data', // Alias for the joined data
      },
    },

    // Unwind the created_by_data array to access the user details
    {
      $unwind: {
        path: '$created_by_data',
        preserveNullAndEmptyArrays: true, // In case created_by field is null or doesn't exist
      },
    },

    // Project the necessary fields, renaming 'created_by_data' to 'createdBy'
    {
      $project: {
        sr: 1,
        _id: 1,
        name: 1,
        status: 1,
        description: 1,
        short_name: 1,
        createdAt: 1,

        // Project the joined 'created_by_data' as 'createdBy'
        created_by_data: {
          _id: '$created_by_data._id',
          name: '$created_by_data.name',
        },
      },
    },
  ]

  const result = await UnitModel.aggregate(pipeline)

  // Check if a document was found
  if (result.length === 0) {
    throw new ApiError(statusCodes.NOT_FOUND.code, 'Customer not found.')
  }

  return result[0]
}

export default show
