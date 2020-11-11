import { Router } from 'express';
import productsRouter from './productsRouter';
import categoryRouter from './categoryRouter';

const router = Router();

router.use('/products', productsRouter);
router.use('/categories', categoryRouter);

export default router;
