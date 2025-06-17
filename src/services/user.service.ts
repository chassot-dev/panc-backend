import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ENV } from '../config/env';
import { BadRequestError, DuplicatedError, NotFoundError } from '../utils/errors';

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

		const isValid = await bcrypt.compare(password, user.senha);
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

	async userUpdate(id: number, name: string, email: string, password: string): Promise<string> {

		// Cria a instância de usuário
		const user = await User.createFromId(id);

		// Verifica se achou o usuário
		if (user === null) {
			throw new NotFoundError('Login incorreto!');
		}

		// Atualiza os campos se forem fornecidos
		if (name){
			user.name = name;
		}
		if (email){
			user.email = email;
		}
		if (password){
			await user.setPassword(password);
		}

		await user.saveOnDB();

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			ENV.SECRET,
			{ expiresIn: '1h' }
		);

		return token;

	}

	async userFindById(id: number): Promise<string> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const user = await User.createFromId(id);

		if (!user) {
			throw new NotFoundError('Não encontramos este usuário');
		}

		return user.name;

	}

}

export default new UserService();
