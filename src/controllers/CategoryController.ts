import { Request, Response, NextFunction } from 'express';
import Category , { ICategory } from '../models/Category';
import { handleError } from '../errors/handleError';
import Product from '../models/Product';

export interface IImage {
  image: string;
  imageNormal: string;
  imageAspectRatio: number;
}

const transformCategory = async (category) => {
  const productsCount = await Product.countDocuments({ categories: { $all: [category.id] } });
  return { ...category, productsCount };
};

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const categories: ICategory[] = await Category.find();
    const totalCount: number = await Category.countDocuments();

    const result = await Promise.all(categories.map(async (item) => await transformCategory(item.toJSON())));

    res.json({
      data: result,
      totalCount
    });
  } catch (err) {
    next(err);
  }
}

export async function retrieve(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: { id: string } = req.params;

    const category: ICategory = await Category.findOne({ _id: id });

    if (!category) {
      return handleError(res, 400, 'Category is not exist.');
    }

    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const category: ICategory = new Category(req.body);

    await category.save();

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: { id: string } = req.params;

    const category: ICategory = await Category.findOne({ _id: id });

    if (!category) {
      return handleError(res, 400, 'Category is not exist.');
    }

    category.set(req.body);

    await category.save();

    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: categoryId }: { id: string } = req.params;

    await Category.deleteOne({ _id: categoryId });

    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
}
