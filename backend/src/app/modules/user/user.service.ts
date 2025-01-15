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
  const result = await UserModel.find({}).select('-password') // Exclude the password field

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
