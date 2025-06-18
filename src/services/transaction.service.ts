import Decimal from 'decimal.js';
import Transaction from '../models/transaction.model';
import { BadRequestError, NotFoundError } from '../utils/errors';

class TransactionService {

	async findById(id: number): Promise<Transaction> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const transaction = await Transaction.createFromId(id);

		if (!transaction) {
			throw new NotFoundError('Não encontramos este tipo');
		}

		return transaction;

	}

	/*async getAll(userId: number): Promise<Partial<Transaction>[]> {

		if (!userId) {
			throw new NotAllowedError('Você precisa autenticar primeiro!');
		}

		const permissions = await Transaction.getAll();

		if (!permissions.length) {
			throw new NotFoundError('Nenhum tipo encontrado');
		}

		return permissions;

	}*/

	async create(userId: number, amount: number, typeId: number): Promise<Transaction> {

		if (!userId || !amount || !typeId) {
			throw new BadRequestError('Informe todos os dados!');
		}

		// Cria o objeto Decimal
		const amountDecimal = new Decimal(amount);

		// Cria a transação e salva no banco
		const transaction = await Transaction.create(userId, amountDecimal, typeId);

		// Retorna o ID da transação
		return transaction;

	}


}

export default new TransactionService();
