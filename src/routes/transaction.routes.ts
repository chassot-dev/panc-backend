import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import TransactionController from '../controllers/transaction.controller';

const router = express.Router();
const transaction = new TransactionController();

router.get('/:id', authenticateToken, (req, res, next) => transaction.findById(req, res, next));

export default router;