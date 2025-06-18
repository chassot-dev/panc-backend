import TransactionType from '../models/transactionTypes.model';
import { BadRequestError, NotAllowedError, NotFoundError } from '../utils/errors';

class TransactionTypeService {

	async findById(id: number): Promise<Partial<TransactionType>> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const transactionType = await TransactionType.createFromId(id);

		if (!transactionType) {
			throw new NotFoundError('Não encontramos este tipo');
		}

		return transactionType;

	}

	async getAll(userId: number): Promise<Partial<TransactionType>[]> {

		if (!userId) {
			throw new NotAllowedError('Você precisa autenticar primeiro!');
		}

		const permissions = await TransactionType.getAll();

		if (!permissions.length) {
			throw new NotFoundError('Nenhum tipo encontrado');
		}

		return permissions;

	}

}

export default new TransactionTypeService();
