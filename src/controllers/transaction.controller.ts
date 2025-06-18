import TransactionService from '../services/transaction.service';
import { NextFunction, Request, Response } from 'express';

class TransactionController {

	findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = Number(req.params.id);

			const transaction = await TransactionService.findById(id);

			res.status(200).json({
				message: 'Transação Encontrada',
				transaction: transaction.toSafeObject()
			});

		} catch (err) {

			next(err);

		}

	}

	create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const { userId, amount, typeId } = req.body;

			await TransactionService.create(
				Number(userId),
				Number(amount),
				Number(typeId)
			);

			res.status(201).json({ message: 'Criado com sucesso'});

		} catch (err) {

			next(err);

		}

	};

	/*getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const id = Number(req.user?.id);

			const transactionTypes = await TransactionService.getAll(id);

			res.status(200).json({ message: 'Tipos encontrados encontrados', transactionTypes });

		} catch (err) {

			next(err);

		}

	}*/

}


export default TransactionController;