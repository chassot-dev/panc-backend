import { NextFunction, Request, Response } from "express";
import GeminiService from "../../services/gemini.service";

class GeminiController {
  async ask(req: Request, res: Response, next: NextFunction) {
    try {

      const id = Number(req.params.id);
      const {prompt} = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "O campo 'prompt' é obrigatório." });
      }

      const answer = await GeminiService.ask(id, prompt);
      return res.json({ answer });

    } catch (err) {
      next(err)
    }
  }
}

export default new GeminiController();
