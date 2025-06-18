import transaction_typesService from '../services/transaction_types.service';
import { NextFunction, Request, Response } from 'express';

class TransactionTypeController {

	findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = req.params.id as string;

			const transactionType = await transaction_typesService.findById(Number(id));

			res.status(200).json({ message: 'Tipo encontrado', transactionType });

		} catch (err) {

			next(err);

		}

	}

	getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = Number(req.user?.id);

			const transactionTypes = await transaction_typesService.getAll(id);

			res.status(200).json({ message: 'Tipos encontrados encontrados', transactionTypes });

		} catch (err) {

			next(err);

		}

	}

}


export default TransactionTypeController;