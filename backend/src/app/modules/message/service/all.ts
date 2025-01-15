import { MessageType } from '../message.interface'
import UnitModel from '../message.model'

const index = async (): Promise<MessageType[] | null> => {
  const result = await UnitModel.aggregate()
  return result
}

export default index
