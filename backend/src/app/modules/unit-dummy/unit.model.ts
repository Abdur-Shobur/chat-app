import { autoIncrementField } from '../../../helpers/sr-increment'
import { UnitDocument, UnitModelType, UnitType } from './unit.interface'

import mongoose, { Schema, CallbackError } from 'mongoose'

// Define the UserRole schema
const ISchema: Schema<UnitDocument> = new Schema(
  {
    // sr
    sr: {
      type: Number,
      unique: true,
    },

    // name
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      max: 32,
    },

    // short_name
    short_name: {
      type: String,
      required: [true, 'Short Name is required.'],
      trim: true,
      max: 32,
    },

    // description
    description: {
      type: String,
      trim: true,
      max: 120,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      unique: false,
    },
  },

  {
    timestamps: true,
  }
)
// Presave hook to handle auto-increment Customer
ISchema.pre('save', async function (next) {
  try {
    await autoIncrementField('Unit', 'sr', this as any)
    next()
  } catch (error) {
    next(error as CallbackError | undefined)
  }
})

/*Get Active Unit
-----------------------------------
Example: Requesting only the 'status' and 'status' fields
  const user = await CategoryModel.activeUnits(status, ['_id', 'name']);
*/
ISchema.statics.activeUnits = async function (
  status: string,
  fields: (keyof UnitType)[]
) {
  const selectedFields = fields.join(' ')
  return await this.find({ status }).select(selectedFields).exec()
}
/*
---------end Active Unit------------
*/
// Create the UserRole model from the schema
const UnitModel = mongoose.model<UnitDocument, UnitModelType>('Unit', ISchema)

export default UnitModel
