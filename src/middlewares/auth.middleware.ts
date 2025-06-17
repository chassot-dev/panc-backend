import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt.interface'
import { NotAllowedError } from '../utils/errors';
import { ENV } from '../config/env';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

	if (!token) {
		return next(new NotAllowedError('Token não fornecido'));
	}

	jwt.verify(token, ENV.SECRET, (err, user) => {

		if (err) {
			return next(new NotAllowedError('Token inválido'));
		}

		req.user = user as JwtPayload;

		next();

	});
}
