import { ErrorRequestHandler } from 'express';
import { BadRequestError, DuplicatedError, ForbiddenError, NotAllowedError, NotFoundError } from '../utils/errors';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

	console.error('Erro capturado no middleware:', err);

	if (err instanceof ZodError) {
		res.status(400).json({
			message: 'Erro de validação',
			errors: err.errors.map(e => ({
				campo: e.path.join('.'),
				erro: e.message
			})),
		});
		return;
	}

	if (err instanceof BadRequestError) {
		res.status(400).json({ erro: err.message });
		return;
	}

	if (err instanceof DuplicatedError) {
		res.status(409).json({ erro: err.message });
		return;
	}

	if (err instanceof NotFoundError) {
		res.status(404).json({ erro: err.message });
		return;
	}

	if (err instanceof NotAllowedError) {
		res.status(401).json({ erro: err.message });
		return;
	}
	if (err instanceof ForbiddenError) {
		res.status(403).json({ erro: err.message });
		return;
	}

	// Erro genérico (não previsto)
	res.status(500).json({ erro: 'Erro interno do servidor' });

};
