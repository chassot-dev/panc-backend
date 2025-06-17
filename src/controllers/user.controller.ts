import UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

class UserController {

	userSignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {

			const { name, email, password } = req.body;

			const id = await UserService.signUp(name, email, password);

			res.status(201).json({ message: 'Usuário criado', id });

		} catch (err: any) {

			next(err);

		}
	};

	userSignIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {

			const { email, password } = req.body;

			const token = await UserService.signIn(email, password);

			res.status(200).json({ message: 'Autenticado com sucesso', token });

		} catch (err) {

			next(err);

		}
	}

	userUpdateInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {

			const { name, email, password } = req.body;

			const token = await UserService.userUpdate(email, password);

			res.status(200).json({ message: 'Autenticado com sucesso', token });

		} catch (err) {

			next(err);

		}
	}

	userFindById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = req.params.id as string;

			const name = await UserService.userFindById(Number(id));

			res.status(200).json({ message: 'Usuário Encontrado', name });

		} catch (err) {

			next(err);

		}

	}

}


export default UserController;