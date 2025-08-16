import { AnyZodObject, ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
	try {
		req.body = schema.parse(req.body);
		next();
	} catch (err) {
		next(err);
	}
};


export const validateParams = (schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			req.params = schema.parse(req.params);
			next();
		} catch (err) {
			next(err);
		}
	};