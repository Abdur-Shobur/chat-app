import { UnitType } from '../unit.interface'
import UnitModel from '../unit.model'

const index = async (): Promise<UnitType[] | null> => {
  const result = await UnitModel.aggregate()
  return result
}

export default index
