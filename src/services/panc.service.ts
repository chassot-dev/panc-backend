import Panc from '../models/panc.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ENV } from '../config/env';
import { BadRequestError, DuplicatedError, ForbiddenError, NotAllowedError, NotFoundError } from '../utils/errors';
import { PancCreationAttributes } from '../interfaces/panc.interface';

class PancService {

	async create(data: {
		nome_cientifico: string;
		familia_botanica: string;
		origem: string;
		habito_crescimento: string;
		identificacao_botanica: string;
	}): Promise<Panc> {

		const existingPanc = await Panc.findOne({ where: { nome_cientifico: data.nome_cientifico } });
		if (existingPanc) {
			throw new DuplicatedError('Panc já cadastrada com este nome científico.');
		}

		const panc = await Panc.create(data);

		return panc;
	}


	async update(
		id: number,
		data: Partial<{
			nome_cientifico: string;
			familia_botanica: string;
			origem: string;
			habito_crescimento: string;
			identificacao_botanica: string;
		}>
	): Promise<Panc> {

		const panc = await Panc.findByPk(id);
		if (!panc) {
			throw new NotFoundError('Panc não encontrada.');
		}

		await panc.update(data);

		return panc;
	}

	async findById(id: number): Promise<Panc> {

		if (!id) {
			throw new BadRequestError('Informe o id');
		}

		const panc = await Panc.findByPk(id);

		if (!panc) {
			throw new NotFoundError('Não encontramos este usuário');
		}

		return panc;

	}

	async getAll(): Promise<Panc[]> {
		const pancs = await Panc.findAll();

		if (!pancs.length) {
			throw new NotFoundError('Nenhuma Panc encontrada.');
		}

		return pancs;
	}

}

export default new PancService();
