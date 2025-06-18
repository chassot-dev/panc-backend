import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import TransactionController from '../controllers/transaction.controller';
import { createTransactionSchema } from '../schemas/transanction.schemas';
import { validateBody, validateParams } from '../middlewares/schema.middleware';
import { idParamSchema } from '../schemas/basic.schemas';

const router = express.Router();
const transaction = new TransactionController();

router.get('/:id', authenticateToken, validateParams(idParamSchema), (req, res, next) => transaction.findById(req, res, next));
router.post('/', authenticateToken, validateBody(createTransactionSchema), (req, res, next) => transaction.create(req, res, next));

export default router;