import TransactionTypeService from '../services/transaction_types.service';
import { NextFunction, Request, Response } from 'express';

class TransactionTypeController {

	findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = req.params.id as string;

			const transactionType = await TransactionTypeService.findById(Number(id));

			res.status(200).json({
				message: 'Tipo Encontrado',
				permission: transactionType.toSafeObject()
			});

		} catch (err) {

			next(err);

		}

	}

	getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = Number(req.user?.id);

			const transactionTypes = await TransactionTypeService.getAll(id);

			res.status(200).json({ message: 'Tipos encontrados encontrados', transactionTypes });

		} catch (err) {

			next(err);

		}

	}

}


export default TransactionTypeController;