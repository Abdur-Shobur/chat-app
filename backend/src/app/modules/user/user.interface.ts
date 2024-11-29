import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
export type UserType = {
  name: string
  phone: string
  email: string
  password?: string
  _id?: ObjectId
}

export type UserModelType = {
  getUser(
    // eslint-disable-next-line no-unused-vars
    email: string,
    // eslint-disable-next-line no-unused-vars
    fields: (keyof UserType)[]
  ): Promise<Partial<UserType> | null>

  isUserExist(
    // eslint-disable-next-line no-unused-vars
    email: string
  ): Promise<Pick<UserType, 'email' | 'password' | '_id'>>
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string
  ): Promise<boolean>
} & Model<UserType>

export interface UserDocument extends Document, UserType {}
