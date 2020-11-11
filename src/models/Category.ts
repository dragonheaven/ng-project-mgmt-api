import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

export interface ICategory extends Document {
  name: string;
  parentCategory: string;
  description: string;
}

export interface ICategoryModel extends Model<ICategory> {
}

const categorySchema = new Schema({
  _id: {
    type: String,
    default: () => `cg_${Random.id()}`,
    required: true
  },
  name: String,
  description: String,
  parentCategory: String
}, { timestamps: true });

const Category = mongoose.model<ICategory, ICategoryModel>('Category', categorySchema);

export default Category;
