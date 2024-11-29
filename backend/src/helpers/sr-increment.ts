import mongoose from 'mongoose'

// Utility function to auto-increment a field
export async function autoIncrementField(
  modelName: string,
  fieldName: string,
  doc: mongoose.Document
): Promise<void> {
  if (doc.isNew) {
    const lastDocument = await mongoose
      .model(modelName)
      .findOne({}, { [fieldName]: 1 })
      .sort({ [fieldName]: -1 })
      .exec()

    // Use type assertion to avoid TypeScript errors
    const fieldValue = lastDocument ? lastDocument[fieldName] + 1 : 1
    ;(doc as any)[fieldName] = fieldValue
  }
}
