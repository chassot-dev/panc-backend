import Permission from '../models/permission.model';
import { BadRequestError, DuplicatedError, ForbiddenError, NotFoundError } from '../utils/errors';

class PermissionService {

	async findById(id: number): Promise<string> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const permission = await Permission.createFromId(id);

		if (!permission) {
			throw new NotFoundError('Não encontramos esta permissão');
		}

		return permission.name;

	}

}

export default new PermissionService();
