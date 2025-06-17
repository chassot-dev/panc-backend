import permissionService from '../services/permission.service';
import { NextFunction, Request, Response } from 'express';

class PermissionController {

	findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = req.params.id as string;

			const name = await permissionService.findById(Number(id));

			res.status(200).json({ message: 'Permissão Encontrada', name });

		} catch (err) {

			next(err);

		}

	}

	getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = Number(req.user?.id);

			const permissions = await permissionService.getAll(id);

			res.status(200).json({ message: 'Permissões encontradas', permissions });

		} catch (err) {

			next(err);

		}

	}

}


export default PermissionController;