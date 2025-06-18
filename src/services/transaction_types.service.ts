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

}

export default new TransactionTypeService();
