import { z } from 'zod';

export const createTransactionSchema = z.object({

	userId: z.number().int().positive({
		message: 'userId deve ser um número inteiro positivo',
	}),
	amount: z.number().positive({
		message: 'amount deve ser um número positivo',
	}),
	typeId: z.number().int().positive({
		message: 'typeId deve ser um número inteiro positivo',
	}),

});