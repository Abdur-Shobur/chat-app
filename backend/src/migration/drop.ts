/* eslint-disable no-console */
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://test-user:2n2rx9cBHEudr9rQ@cluster0.dvmuh.mongodb.net/pos?retryWrites=true&w=majority&appName=Cluster0`
    )
    // await mongoose.connect('mongodb://127.0.0.1:27017/pos')

    console.log('Database connected')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

const dropSells = async () => {
  try {
    // List of models to drop
    const modelsToDrop = [
      // PosSellModel,
      // ProductModel,
      // InventoryModel,
      // BrandModel,
      // PurchasePaymentHistoryModel,
      // PurchaseModel,
      // SellPaymentHistoryModel,
      // StoreModel,
      // WarehouseModel,
      // SupplierModel,
      // UnitModel,
      // VariantModel,
    ]

    for (const model of modelsToDrop) {
      const collectionName = model.collection.name
      if (await model.collection.drop()) {
        console.log(`Dropped collection: ${collectionName}`)
      }
    }
  } catch (error) {
    console.error('Error dropping collections:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

// eslint-disable-next-line no-unused-vars
const dropData = async () => {
  try {
    // await ProductModel.updateMany(
    //   {},
    //   { $unset: { manufacture_date: 1, expire_date: 1 } }
    // )
    // Verify that fields have been removed
    // const remainingFields = await ProductModel.find({})
    // console.log(
    //   remainingFields,
    //   'Documents with remaining fields (should be empty)'
    // )
  } catch (error) {
    console.error('Error dropping collections:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

connectDB().then(() => dropSells())
