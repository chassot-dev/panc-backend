import { z } from 'zod';

export const createTransactionSchema = z.object({

	amount: z.number().positive({
		message: 'amount deve ser um número positivo',
	}),
	typeId: z.number().int().positive({
		message: 'typeId deve ser um número inteiro positivo',
	}),

});