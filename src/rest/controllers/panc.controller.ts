import PancService from '../../services/panc.service';

import { NextFunction, Request, Response } from 'express';
import fs from "fs";
import axios from "axios";
import Panc from '../../domain/panc/panc.model';
import { NotFoundError } from '../../exceptions/errors';
import RoboflowService from '../../integration/roboflow/roboflow.service';

class PancController {

	updateInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {

			const id = Number(req.params.id);
	
    		const { name, email, password } = req.body;

			const token = await PancService.update(id, name, email, password);

			res.status(200).json({ message: 'Dados atualizados com sucesso!', token });

		} catch (err) {

			next(err);

		}
	}

	findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const pancId = Number(req.params?.id!)

			const panc = await PancService.findById(pancId);

			res.status(200).json({
				message: 'Usuário Encontrado',
				panc: panc.toJSON()
			});

		} catch (err) {

			next(err);

		}

	}

	getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const pancId = Number(req.params!.id)

			const pancs = await PancService.getAll(pancId);

			res.status(200).json(pancs);

		} catch (err) {

			next(err);

		}

	}

	async detect(req: Request, res: Response, next: NextFunction) {
		try {
		const imageBuffer = fs.readFileSync(req.file!.path);
		const imageBase64 = imageBuffer.toString("base64");

		const result = await RoboflowService.detect(imageBase64);

		res.status(200).json({
			message: "Detecção realizada com sucesso!",
			result,
		});
		} catch (err: any) {
		if (err.message.includes("Not Found")) {
			res.status(404).json({ error: err.message });
		} else {
			next(err);
		}
    }
}

}


export default PancController;