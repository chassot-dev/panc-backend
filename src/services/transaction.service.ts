import Decimal from 'decimal.js';
import Transaction from '../models/transaction.model';
import { BadRequestError, NotFoundError } from '../utils/errors';

class TransactionService {

	async getById(id: number): Promise<Transaction> {

		const transaction = await Transaction.createFromId(id);

		if (!transaction) {
			throw new NotFoundError('Não encontramos este tipo');
		}

		return transaction;

	}

	async getAll(): Promise<{ id: number, user: {id: number, name: string}, amount: number, type: {id: number, name: String, is_expense: number}, transactionDate: String | null, createdAt: String | null }[]> {

		const permissions = await Transaction.getAll();

		if (!permissions.length) {
			throw new NotFoundError('Nenhuma transação encontrada');
		}

		return permissions;

	}

	async create(userId: number, amount: number, typeId: number): Promise<Transaction> {

		const amountDecimal = new Decimal(amount);
		const transaction = await Transaction.create(userId, amountDecimal, typeId);

		return transaction;

	}


}

export default new TransactionService();
