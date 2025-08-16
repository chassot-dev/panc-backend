import Panc from '../domain/panc/panc.model';
import { BadRequestError, DuplicatedError, ForbiddenError, NotAllowedError, NotFoundError } from '../exceptions/errors';

class PancService {

	async create(panc: Panc): Promise<Panc> {

		// TODO criacao

		return panc;

	}

	async update(id: number, name?: string, email?: string, password?: string): Promise<void> {
		const panc = await Panc.findByPk(id);

		if (panc === null) {
			throw new NotFoundError('Panc não encontrada!');
		}

		// TODO atualizar
		// await Panc.();

		return;
	}

	async findById(id: number): Promise<Panc> {
		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const panc = await Panc.findByPk(id);

		if (!panc) {
			throw new NotFoundError('Não encontramos este usuário');
		}

		return panc;

	}

	async getAll(pancId: number): Promise<Panc[]> {

		const pancs = await Panc.findAll();

		if (!pancs.length) {
			throw new NotFoundError('Nenhum usuário encontrado');
		}

		return pancs;

	}

}

export default new PancService();
