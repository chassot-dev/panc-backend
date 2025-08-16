import PancService from '../../services/panc.service';

import { NextFunction, Request, Response } from 'express';
import fs from "fs";
import axios from "axios";
import Panc from '../../domain/panc/panc.model';
import { NotFoundError } from '../../exceptions/errors';
import RoboflowService from '../../integration/roboflow/roboflow.service';
import roboflowService from '../../integration/roboflow/roboflow.service';

class PancController {

	updateInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const id = Number(req.params.id);

			const {
				nome_cientifico,
				familia_botanica,
				origem,
				habito_crescimento,
				identificacao_botanica
			} = req.body;

			const updatedPanc = await PancService.update(id, {
				nome_cientifico,
				familia_botanica,
				origem,
				habito_crescimento,
				identificacao_botanica
			});

			res.status(200).json({
				message: 'Panc atualizada com sucesso!',
				panc: updatedPanc
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
			console.log(req.body)
			 const imageBase64 = req.file?.buffer.toString('base64');
			console.log(imageBase64)

			if (!imageBase64) {
				return res.status(400).json({ error: "Nenhuma imagem enviada" });
			}

			const result = await roboflowService.detect(imageBase64);

			res.status(200).json({
				message: "Detecção realizada com sucesso!",
				result,
			});
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