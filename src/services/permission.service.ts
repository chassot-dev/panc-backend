import Permission from '../models/permission.model';
import { BadRequestError, NotAllowedError, NotFoundError } from '../utils/errors';

class PermissionService {

	async findById(id: number): Promise<Permission> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const permission = await Permission.createFromId(Number(id));

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

		// Remove a senha de cada usuário antes de retornar
		return permissions;

	}

}

export default new PermissionService();
