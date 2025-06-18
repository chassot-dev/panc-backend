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

			const id = Number(req.params.id);
			const userId = req.user!.id;
    		const { name, email, password } = req.body;

			const token = await UserService.update(userId, id, name, email, password);

			res.status(200).json({ message: 'Dados atualizados com sucesso!', token });

		} catch (err) {

			next(err);

		}
	}

	userFindById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = Number(req.params.id as string);
			const userId = Number(req.user?.id!)

			const user = await UserService.findById(userId, id);

			res.status(200).json({
				message: 'Usuário Encontrado',
				user: user.toSafeObject()
			});

		} catch (err) {

			next(err);

		}

	}

	getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const userId = Number(req.user!.id)

			const users = await UserService.getAll(userId);

			res.status(200).json({ message: 'Lista de usuários encontrada!', users });

		} catch (err) {

			next(err);

		}

	}

}


export default UserController;