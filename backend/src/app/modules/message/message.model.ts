import {
  MessageDocument,
  MessageModelType,
  MessageType,
} from './message.interface'

import mongoose, { Schema } from 'mongoose'

// Define the UserRole schema
const ISchema: Schema<MessageDocument> = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
)

/*Get Active Unit
-----------------------------------
Example: Requesting only the 'status' and 'status' fields
  const user = await CategoryModel.activeUnits(status, ['_id', 'name']);
*/
ISchema.statics.activeUnits = async function (
  status: string,
  fields: (keyof MessageType)[]
) {
  const selectedFields = fields.join(' ')
  return await this.find({ status }).select(selectedFields).exec()
}
/*
---------end Active Unit------------
*/
// Create the UserRole model from the schema
const MessageModel = mongoose.model<MessageDocument, MessageModelType>(
  'Message',
  ISchema
)

export default MessageModel
