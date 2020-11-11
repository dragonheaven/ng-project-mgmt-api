import { Request, Response, NextFunction } from 'express';
import Product, { IProduct } from '../models/Product';
import { handleError } from '../errors/handleError';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const products: IProduct[] = await Product.find().populate('categories');
    const totalCount = await Product.countDocuments();

    return res.json({
      data: products,
      totalCount
    });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function retrieve(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: { id: string } = req.params;

    const product: IProduct = await Product.findOne({ _id: id });

    if (!product) {
      return handleError(res, 400, 'Product is not exist.');
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: { id: string } = req.params;

    const product: IProduct = await Product.findOne({ _id: id });

    if (!product) {
      return handleError(res, 400, 'Product is not exist.');
    }

    product.set(req.body);
    await product.save();

    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: { id: string } = req.params;

    await Product.deleteOne({ _id: id });

    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
}
