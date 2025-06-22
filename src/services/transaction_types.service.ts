import TransactionType from '../models/transactionTypes.model';
import { NotFoundError } from '../utils/errors';

class TransactionTypeService {

	async findById(id: number): Promise<TransactionType> {

		const transactionType = await TransactionType.createFromId(id);

		if (!transactionType) {
			throw new NotFoundError('Não encontramos este tipo');
		}

		return transactionType;

	}

	async getAll(userId: number): Promise<Partial<TransactionType>[]> {

		const permissions = await TransactionType.getAll();

		if (!permissions.length) {
			throw new NotFoundError('Nenhum tipo encontrado');
		}

		return permissions;

	}

	async create(name: string, is_expense: boolean): Promise<TransactionType> {

		const transaction = await TransactionType.create(name, is_expense);

		return transaction;

	}

}

export default new TransactionTypeService();
