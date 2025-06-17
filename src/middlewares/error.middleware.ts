import { ErrorRequestHandler } from 'express';
import { BadRequestError, DuplicatedError, NotFoundError } from '../utils/errors';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

	console.error('Erro capturado no middleware:', err);

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

	// Erro genérico (não previsto)
	res.status(500).json({ erro: 'Erro interno do servidor' });

};
