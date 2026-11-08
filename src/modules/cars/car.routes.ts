import { Router } from 'express';
import { CarController } from './car.controller';

const router = Router();
const carController = new CarController();

router.post('/', carController.create);
router.get('/', carController.findAll);
router.get('/:id', carController.findOne);
router.delete('/:id', carController.delete);
router.put('/:id', carController.update);
export default router;
