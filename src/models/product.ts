// product.ts
import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  prodNumber: { type: String, required: true, unique: true },
  prodDescription: { type: String, required: true },
  prodListPrice: { type: Number, required: true },
  // Add more properties as needed for your product data
});

export const product = mongoose.models.product || mongoose.model('product', productSchema);