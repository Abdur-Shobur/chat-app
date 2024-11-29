import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'

// category type
export type UnitType = {
  _id: ObjectId
  sr: number
  name: string
  short_name: string
  description: string
  created_by: ObjectId
}

export type UnitModelType = {
  activeUnits(
    // eslint-disable-next-line no-unused-vars

    // eslint-disable-next-line no-unused-vars
    fields: (keyof UnitType)[]
  ): Promise<Partial<UnitType[]> | null>
} & Model<UnitType>

export interface UnitDocument extends Document, UnitType {}
