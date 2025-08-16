import { z } from 'zod';

export const idParamSchema = z.object({
	id: z.coerce.number().int().positive({ message: 'ID inválido' }),
});

export const getAllSchema = z.object({});
