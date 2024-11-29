import { UserDocument, UserModelType, UserType } from './user.interface'
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

// Define the UserRole schema
const userSchema: Schema<UserDocument> = new Schema(
  {
    // name
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
      trim: true,
      max: 32,
    },

    // email
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 32,
    },

    // password
    password: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      max: 32,
    },
  },

  {
    timestamps: true,
  }
)
/*Get User
-----------------------------------
Example: Requesting only the 'email' and 'status' fields
  const user = await UserModel.getUser(email, ['email', 'status']);
*/
userSchema.statics.getUser = async function (
  email: string,
  fields: (keyof UserType)[]
) {
  const selectedFields = fields.join(' ')
  return await this.findOne({ email }).select(selectedFields).exec()
}
/*
---------end get user------------
*/

userSchema.statics.isUserExist = async function (
  identifier: string
): Promise<UserType | null> {
  const isObjectId = mongoose.Types.ObjectId.isValid(identifier)

  return await UserModel.findOne(
    {
      $or: [{ email: identifier }, { _id: isObjectId ? identifier : null }],
    },
    { email: 1, password: 1, role_id: 1, status: 1, _id: 1 }
  )
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.methods.changedPasswordAfterJwtIssued = function (
  jwtTimestamp: number
) {
  // test if token has expired
}

// Create the UserRole model from the schema

// export default UserModel
const UserModel = mongoose.model<UserDocument, UserModelType>(
  'User',
  userSchema
)

export default UserModel
