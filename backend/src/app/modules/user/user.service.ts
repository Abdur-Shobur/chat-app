import { ApiStatusType, StatusType } from '../../../types'
import { UserType } from './user.interface'
import UserModel from './user.model'

// const index = async (): Promise<UserType[] | null> => {
//   const result = await UserModel.find()
//   return result
// }

const index = async (params: {
  status: ApiStatusType
}): Promise<UserType[] | null> => {
  const { status } = params

  const matchStage: { status?: ApiStatusType } = {}

  if (status !== 'all') {
    matchStage.status = status
  }

  // Define the aggregation pipeline
  const pipeline = [
    { $match: matchStage },
    {
      // Use $lookup to join the created_by field with the User collection
      $lookup: {
        from: 'users', // The collection name for User
        localField: 'created_by', // The field in the current document
        foreignField: '_id', // The field in the User collection
        as: 'created_by_data', // The name of the resulting array
      },
    },
    {
      // Unwind the created_by_data array to turn it into a single object
      $unwind: {
        path: '$created_by_data',
        preserveNullAndEmptyArrays: true, // In case created_by is null or missing
      },
    },
    {
      // Use $lookup to join the role_id field with the UserRole collection
      $lookup: {
        from: 'userroles', // The collection name for UserRole
        localField: 'role_id', // The field in the current document
        foreignField: '_id', // The field in the UserRole collection
        as: 'role_data', // The name of the resulting array
      },
    },
    {
      // Unwind the role_data array to turn it into a single object
      $unwind: {
        path: '$role_data',
        preserveNullAndEmptyArrays: true, // In case role_id is null or missing
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        status: 1,
        phone: 1,
        email: 1,
        description: 1,
        image: 1,
        image_type: 1,
        verify: 1,
        balance: 1,
        message: 1,
        point: 1,
        created_by: {
          _id: '$created_by_data._id',
          name: '$created_by_data.name', // Include only _id and name from created_by
        },
        role_id: {
          _id: '$role_data._id', // Include _id from role
          name: '$role_data.name', // Include name from role
        },
      },
    },
  ]

  const result = await UserModel.aggregate(pipeline)

  return result
}

/* store-------------------------------------
   
*/
const store = async (payload: UserType): Promise<UserType | null> => {
  const result = await UserModel.create(payload)
  return result ? result.toObject() : null
}

const show = async (payload: string): Promise<UserType | null> => {
  const result = await UserModel.findOne({ _id: payload }).populate('role_id')

  if (result) {
    const resultObject = result.toObject()

    // Rename role_id to role in the response
    resultObject.role = resultObject.role_id
    resultObject.role_id = resultObject.role._id

    return resultObject
  }

  return null
}

const update = async ({
  id,
  updateData,
}: {
  id: string
  updateData: UserType
}): Promise<UserType | null> => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
  return updatedUser
}

const destroy = async (payload: { id: string }): Promise<any> => {
  const { id } = payload
  return await UserModel.findByIdAndDelete(id)
}

const updateStatus = async (payload: {
  id: string
  status: StatusType
}): Promise<any | null> => {
  const { id, status } = payload

  let updateQuery = { _id: id }
  let update = { status }

  const result = await UserModel.updateOne(updateQuery, update)

  return result
}

export const userService = { index, store, show, update, destroy, updateStatus }
