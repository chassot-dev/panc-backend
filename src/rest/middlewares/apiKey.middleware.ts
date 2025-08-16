import { RequestHandler } from 'express';

export const apiKeyMiddleware: RequestHandler = (req, res, next) => {

	const clientKey = req.header('x-api-key');
	const serverKey = process.env.API_KEY;

	if (!clientKey) {
		res.status(401).json({ erro: 'Chave de API ausente' });
		return;
	}

	if (clientKey !== serverKey) {
		res.status(403).json({ erro: 'Chave de API inválida' });
		return;
	}

	next();

};
