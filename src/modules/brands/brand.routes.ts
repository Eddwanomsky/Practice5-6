import { Router } from 'express';
import { BrandController } from './brand.controller';

const router = Router();
const brandController = new BrandController();

router.post('/', brandController.create);
router.get('/', brandController.findAll);
router.get('/:id', brandController.findOne);
router.delete('/:id', brandController.delete);
router.put('/:id', brandController.update);

export default router;
