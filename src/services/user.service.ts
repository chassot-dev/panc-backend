// user.service.ts

import { error } from 'console';
import User from '../models/user.model';
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
		const user = new User(name, email, password);
		const res = await user.save();

		// Como seu método save retorna o resultado da query, 
		// o id inserido normalmente está em res.insertId (depende do driver)
		return res;

	}

	async userFindByEmail(email: string): Promise<string> {

		if (!email) {
			throw new BadRequestError('Informe o e-mail');
		}

		const name = await User.searchForEmail(email);

		if (name === null) {
			throw new NotFoundError('Não encontramos este e-mail');
		}

		return name;
	}

	async userFindById(id: number): Promise<string> {

		if(!id){
			throw new BadRequestError('Informe o id');
		}

		const name = await User.searchForId(id);

		if (name === null){
			throw new NotFoundError('Não encontramos este usuário');
		}

		return name;
	}
}

export default new UserService();
