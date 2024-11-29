import { UnitType } from '../unit.interface'
import UnitModel from '../unit.model'

const store = async (payload: UnitType): Promise<UnitType | null> => {
  const result = await UnitModel.create(payload)
  return result ? result.toObject() : null
}

export default store
