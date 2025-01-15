import { MessageType } from '../message.interface'
import MessageModel from '../message.model'

const store = async (payload: MessageType): Promise<MessageType | null> => {
  const result = await MessageModel.create(payload)
  return result ? result.toObject() : null
}

export default store
