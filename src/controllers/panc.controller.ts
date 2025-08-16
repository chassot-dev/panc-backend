import PancService from '../services/panc.service';
import { NextFunction, Request, Response } from 'express';
import fs from "fs";
import axios from "axios";
import Panc from '../models/panc.model';
import { NotFoundError } from '../utils/errors';

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

	detect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {
			const image = fs.readFileSync("picao-preto.jpg", {
				encoding: "base64",
			});

			const response = await axios({
				method: "POST",
				url: "https://serverless.roboflow.com/panc-dataset-cskb6/3",
				params: {
					api_key: "LBnhR3wOmNY9eK8BuwF3",
				},
				data: image,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});

			console.log(response.data);
		} catch (error: any) {
			console.error("Erro ao detectar PANC:", error.message);
		}


	}

}


export default PancController;