import { Router } from 'express';
import {
  list,
  create,
  retrieve,
  remove,
  update,
} from '../controllers/ProductsController';
import upload from '../multer';

const productsRouter = Router();

productsRouter.get('/', list);
productsRouter.post('/', upload.single('profilePhoto'), create);
productsRouter.get('/:id', retrieve);
productsRouter.put('/:id', upload.single('profilePhoto'), update);
productsRouter.delete('/:id', remove);

export default productsRouter;
