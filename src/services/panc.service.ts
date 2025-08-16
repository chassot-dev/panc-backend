import Panc from '../models/panc.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ENV } from '../config/env';
import { BadRequestError, DuplicatedError, ForbiddenError, NotAllowedError, NotFoundError } from '../utils/errors';

class PancService {

	async signUp(name: string, email: string, password: string): Promise<Panc> {

		// Verifica se email já existe
		const existingPanc = await Panc.searchForEmail(email);
		if (existingPanc) {
			throw new DuplicatedError('Email já cadastrado.');
		}

		// Cria o usuário e salva no banco
		const panc = await Panc.create(name, email, password);

		// retorna o id
		return panc;

	}

	async signIn(email: string, password: string): Promise<string> {

		const panc = await Panc.searchForEmail(email);

		if (panc === null) {
			throw new NotFoundError('Login incorreto!');
		}

		const isValid = await bcrypt.compare(password, panc.password);
		if (!isValid) {
			throw new NotFoundError('Login incorreto');
		}

		const token = jwt.sign(
			{ id: panc.id, email: panc.email },
			ENV.SECRET,
			{ expiresIn: '1h' }
		);

		return token;

	}

	async update(id: number, name?: string, email?: string, password?: string): Promise<string> {

		// Cria a instância de usuário
		const panc = await Panc.getById(id);

		// Verifica se achou o usuário
		if (panc === null) {
			throw new NotFoundError('Usuário não encontrado!');
		}

		// Atualiza os campos se forem fornecidos
		if (name) {
			panc.name = name;
		}
		if (email) {
			panc.email = email;
		}
		if (password) {
			await panc.setPassword(password);
		}

		// Atira tudo no banco
		await panc.saveOnDB();

		// Recria o token //
		const token = jwt.sign(
			{ id: panc.id, email: panc.email },
			ENV.SECRET,
			{ expiresIn: '1h' }
		);

		return token;

	}

	async findById(id: number): Promise<Panc> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const panc = await Panc.getById(id);

		if (!panc) {
			throw new NotFoundError('Não encontramos este usuário');
		}

		return panc;

	}

	async getAll(pancId: number): Promise<{ id: number; name: string; email: string }[]> {

		const pancs = await Panc.getAll();

		if (!pancs.length) {
			throw new NotFoundError('Nenhum usuário encontrado');
		}

		return pancs;

	}

}

export default new PancService();
