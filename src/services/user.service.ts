import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ENV } from '../config/env';
import { BadRequestError, DuplicatedError, ForbiddenError, NotAllowedError, NotFoundError } from '../utils/errors';

class UserService {

	async signUp(name: string, email: string, password: string): Promise<number> {

		if (!name || !email || !password) {
			throw new BadRequestError('Informe todos os dados!');
		}

		// Verifica se email já existe
		const existingUser = await User.searchForEmail(email);
		if (existingUser) {
			throw new DuplicatedError('Email já cadastrado.');
		}

		// Cria o usuário e salva no banco
		const id = await User.create(name, email, password);

		// retorna o id
		return id;

	}

	async signIn(email: string, password: string): Promise<string> {

		if (!email || !password) {
			throw new BadRequestError('Email ou senha não informado!');
		}

		console.log('Temos email e senha');

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

		if (!id) {
			throw new BadRequestError('ID é obrigatório!');
		}

		if (userId != id) {
			throw new ForbiddenError('Você não tem permissao para atualizar!')
		}

		if (!name && !email && !password) {
			throw new BadRequestError('Informe pelo menos um campo para atualizar!');
		}

		// Cria a instância de usuário
		const user = await User.createFromId(id);

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

	async findById(userId: number, id: number): Promise<string> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		if (userId != id) {
			throw new ForbiddenError('Você não tem permissão!')
		}

		const user = await User.createFromId(id);

		if (!user) {
			throw new NotFoundError('Não encontramos este usuário');
		}

		return user.name;

	}

	async getAll(userId: number): Promise<Partial<User>[]> {
		if (!userId) {
			throw new NotAllowedError('Você precisa autenticar primeiro!');
		}

		const users = await User.findAll();

		if (!users.length) {
			throw new NotFoundError('Nenhum usuário encontrado');
		}

		// Remove a senha de cada usuário antes de retornar
		return users.map(user => user.toSafeObject());
	}


}

export default new UserService();
