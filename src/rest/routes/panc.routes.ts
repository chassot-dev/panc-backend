import express from 'express';
import PancController from '../controllers/panc.controller';
import { validateBody, validateParams } from '../middlewares/schema.middleware';

const router = express.Router();
const pancController = new PancController();

router.get('/',  (req, res, next) => pancController.getAll(req, res, next));
router.get('/detect',  (req, res, next) => pancController.detect(req, res, next));
router.get('/:id', (req, res, next) => pancController.findById(req, res, next));

router.patch('/update/:id',
	(req, res, next) => pancController.updateInfo(req, res, next)
);

export default router;
