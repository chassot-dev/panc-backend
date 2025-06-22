import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ENV } from '../config/env';
import { BadRequestError, DuplicatedError, ForbiddenError, NotAllowedError, NotFoundError } from '../utils/errors';
import Permission from '../models/permission.model';

class UserService {

	async signUp(name: string, email: string, password: string): Promise<User> {

		// Verifica se email já existe
		const existingUser = await User.searchForEmail(email);
		if (existingUser) {
			throw new DuplicatedError('Email já cadastrado.');
		}

		// Cria o usuário e salva no banco
		const user = await User.create(name, email, password);

		// retorna o id
		return user;

	}

	async signIn(email: string, password: string): Promise<string> {

		const user = await User.searchForEmail(email);

		if (user === null) {
			throw new NotFoundError('Login incorreto!');
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			throw new NotFoundError('Login incorreto');
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			ENV.SECRET,
			{ expiresIn: '1h' }
		);

		return token;

	}

	async update(userId: number, id: number, name?: string, email?: string, password?: string): Promise<string> {

		const hasAdminPermission = await Permission.userHasPermission(userId, 'admin');

		if (userId !== id && !hasAdminPermission) {
			throw new ForbiddenError('Você não tem permissão para isso!');
		}

		// Cria a instância de usuário
		const user = await User.getById(id);

		// Verifica se achou o usuário
		if (user === null) {
			throw new NotFoundError('Usuário não encontrado!');
		}

		// Atualiza os campos se forem fornecidos
		if (name) {
			user.name = name;
		}
		if (email) {
			user.email = email;
		}
		if (password) {
			await user.setPassword(password);
		}

		// Atira tudo no banco
		await user.saveOnDB();

		// Recria o token //
		const token = jwt.sign(
			{ id: user.id, email: user.email },
			ENV.SECRET,
			{ expiresIn: '1h' }
		);

		return token;

	}

	async findById(userId: number, id: number): Promise<User> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const hasAdminPermission = await Permission.userHasPermission(userId, 'admin');

		if (userId !== id && !hasAdminPermission) {
			throw new ForbiddenError('Você não tem permissão para isso!');
		}

		const user = await User.getById(id);

		if (!user) {
			throw new NotFoundError('Não encontramos este usuário');
		}

		return user;

	}

	async getAll(userId: number): Promise<{ id: number; name: string; email: string }[]> {

		const users = await User.getAll();

		if (!users.length) {
			throw new NotFoundError('Nenhum usuário encontrado');
		}

		return users;

	}

}

export default new UserService();
