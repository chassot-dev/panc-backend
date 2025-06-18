import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import TransactionTypeController from '../controllers/transactionTypes.controller';
import { validateParams } from '../middlewares/schema.middleware';
import { idParamSchema } from '../schemas/basic.schemas';

const router = express.Router();
const transactionTypeController = new TransactionTypeController();

router.get('/', authenticateToken, (req, res, next) => transactionTypeController.getAll(req, res, next));
router.get('/:id', authenticateToken, validateParams(idParamSchema), (req, res, next) => transactionTypeController.findById(req, res, next));

export default router;
