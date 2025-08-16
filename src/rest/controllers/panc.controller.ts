import PancService from '../../services/panc.service';

import { NextFunction, Request, Response } from 'express';
import roboflowService from '../../integration/roboflow/roboflow.service';
import pancService from '../../services/panc.service';

class PancController {



	updateInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const id = Number(req.params.id);

			const {
				nome_cientifico,
				familia_botanica,
				origem,
				habito_crescimento,
				identificacao_botanica,
				nome_popular,
				partes_comestiveis
			} = req.body;

			const updatedPanc = await PancService.update(id, {
				nome_cientifico,
				familia_botanica,
				origem,
				habito_crescimento,
				identificacao_botanica,
				nome_popular,
				partes_comestiveis
			});

			res.status(200).json({
				message: 'Panc atualizada com sucesso!',
				panc: updatedPanc
			});

		} catch (err) {
			next(err);
		}
	}

	create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {

			const {
				nome,
				img,
				nome_cientifico,
				familia_botanica,
				origem,
				habito_crescimento,
				identificacao_botanica,
				nome_popular,
				partes_comestiveis
			} = req.body;

			const panc = await PancService.create({
				nome,
				img,
				nome_cientifico,
				familia_botanica,
				origem,
				habito_crescimento,
				identificacao_botanica,
				nome_popular,
				partes_comestiveis
			});

			res.status(200).json({
				message: 'Panc atualizada com sucesso!',
				panc: panc
			});

		} catch (err) {
			next(err);
		}
	}


	findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const pancId = Number(req.params.id);

			const panc = await PancService.findById(pancId);

			res.status(200).json({
				message: 'Panc encontrada',
				panc
			});

		} catch (err) {
			next(err);
		}
	}


	getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {

			const pancs = await PancService.getAll();

			res.status(200).json({
				message: 'Lista de Pancs',
				pancs
			});

		} catch (err) {
			next(err);
		}
	}
	async detect(req: Request, res: Response) {
		try {

			const imageBase64 = req.file?.buffer.toString('base64');

			if (!imageBase64) {
				return res.status(400).json({ error: "Nenhuma imagem enviada" });
			}

			const nome_cientifico = await roboflowService.detect(imageBase64);
			let panc = pancService.findByName(nome_cientifico)

			res.status(200).json(
				// TODO panc
				nome_cientifico 
			);
		} catch (err: any) {
			if (err.message.includes("Not Found")) {
				res.status(404).json({ error: err.message });
			} else {
				throw err;
			}
		}
	}
}


export default PancController;