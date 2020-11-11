import { Router } from 'express';
import { list, create, remove, update, retrieve } from '../controllers/CategoryController';

import upload from '../multer';

const categoryRouter = Router();

categoryRouter.get('/', list);
categoryRouter.get('/:id', retrieve);
categoryRouter.post('/', upload.single('image'), create);
categoryRouter.put('/:id', update);
categoryRouter.delete('/:id', remove);

export default categoryRouter;
