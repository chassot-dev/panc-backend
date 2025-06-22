import Permission from '../models/permission.model';
import { NotAllowedError, NotFoundError } from '../utils/errors';

class PermissionService {

	async findById(id: number): Promise<Permission> {

		const permission = await Permission.getById(Number(id));

		if (!permission) {
			throw new NotFoundError('Não encontramos esta permissão');
		}

		return permission;

	}

	async getAll(userId: number): Promise<Partial<Permission>[]> {

		if (!userId) {
			throw new NotAllowedError('Você precisa autenticar primeiro!');
		}

		const permissions = await Permission.getAll();

		if (!permissions.length) {
			throw new NotFoundError('Nenhuma permissão encontrada');
		}

		return permissions;

	}

}

export default new PermissionService();
