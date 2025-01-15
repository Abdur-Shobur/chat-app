import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'

// category type
export type MessageType = {
  _id?: ObjectId
  text: string
  receiver: ObjectId
  sender: ObjectId
}

export type MessageModelType = {
  activeUnits(
    // eslint-disable-next-line no-unused-vars

    // eslint-disable-next-line no-unused-vars
    fields: (keyof MessageType)[]
  ): Promise<Partial<MessageType[]> | null>
} & Model<MessageType>

export interface MessageDocument extends Document, MessageType {}
