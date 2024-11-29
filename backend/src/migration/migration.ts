/* eslint-disable no-console */
import mongoose from 'mongoose'
import PosSellModel from '../app/modules/pos/pos-sell.model'

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/pos')
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection error:', error)
  }
}

const addFieldToAllDocuments = async () => {
  try {
    // Update documents that don't have 'total_product_price' field
    // const result = await PosSellModel.updateMany(
    //   { total_product_price: { $exists: false } },
    //   { $set: { total_product_price: 0 } }
    // )

    const result = await PosSellModel.updateMany(
      { 'product_details.rate': { $exists: false } },
      { $set: { 'product_details.$[].rate': 0 } }
    )
    console.log(`Updated ${result.modifiedCount} documents.`)
  } catch (error) {
    console.error('Error updating documents:', error)
  } finally {
    // Close the database connection
    await mongoose.connection.close()
  }
}

// Run the migration
connectDB().then(() => addFieldToAllDocuments())

// npx ts-node .\src\migration\migration.ts
