import express from 'express';
import PancController from '../controllers/panc.controller';
import { validateBody, validateParams } from '../middlewares/schema.middleware';
import { pancUpdateSchema } from '../../domain/panc/panc.schemas';
import { idParamSchema } from '../../domain/schemas/basic.schemas';

const router = express.Router();
const pancController = new PancController();

router.get('/',  (req, res, next) => pancController.getAll(req, res, next));
router.get('/detect',  (req, res, next) => pancController.detect(req, res, next));
router.get('/:id',  validateParams(idParamSchema), (req, res, next) => pancController.findById(req, res, next));

router.patch('/update/:id', 
	validateParams(idParamSchema), 
	validateBody(pancUpdateSchema), 
	(req, res, next) => pancController.updateInfo(req, res, next)
);

export default router;
