import { Router, RequestHandler } from 'express';
import GeminiController from '../controllers/gemini.controller';

const router = Router();

const askHandler: RequestHandler = async (req, res, next) => {
  try {
    await GeminiController.ask(req, res, next);
  } catch (err) {
    next(err);
  }
};

router.post('/:id', askHandler);

export default router;