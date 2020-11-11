import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';
import { ICategory } from './Category';

export interface IProduct extends Document {
  name: string;
  description: string;
  quantity: number;
  price: number;
  categories: string[] | ICategory[];
}

export interface IProductModal extends Model<IProduct> {
}

export const ProdudctSchema = new Schema({
  _id: {
    type: String,
    default: () => `pro_${Random.id()}`,
    required: true
  },
  name: String,
  description: String,
  quantity: Number,
  price: Number,
  categories: [{ type: String, ref: 'Category' }]
}, { _id: false, timestamps: true });


const Product = mongoose.model<IProduct, IProductModal>('Product', ProdudctSchema);
export default Product;
