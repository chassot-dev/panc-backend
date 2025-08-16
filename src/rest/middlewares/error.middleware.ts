import { ErrorRequestHandler } from 'express';
import { BadRequestError, DuplicatedError, ForbiddenError, NotAllowedError, NotFoundError } from '../../exceptions/errors';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

	console.error('Erro capturado no middleware:', err);

	if (err instanceof ZodError) {
		const firstError = err.errors[0];
		res.status(400).json({
			message: `${firstError.message}`,
		});
		return;
	}

	if (err instanceof BadRequestError) {
		res.status(400).json({ message: err.message });
		return;
	}

	if (err instanceof DuplicatedError) {
		res.status(409).json({ message: err.message });
		return;
	}

	if (err instanceof NotFoundError) {
		res.status(404).json({ message: err.message });
		return;
	}

	if (err instanceof NotAllowedError) {
		res.status(401).json({ message: err.message });
		return;
	}

	if (err instanceof ForbiddenError) {
		res.status(403).json({ message: err.message });
		return;
	}

	res.status(500).json({ message: 'Erro interno do servidor' });

};
