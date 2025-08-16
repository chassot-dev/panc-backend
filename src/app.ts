import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from "cors";
import { runMigrations } from '../src/resources/db/migrate';
import morgan from 'morgan';
import pancRouter from './rest/routes/panc.routes';
import { errorHandler } from './rest/middlewares/error.middleware';
import { apiKeyMiddleware } from './rest/middlewares/apiKey.middleware';

const app: Application = express();

// runMigrations();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(apiKeyMiddleware);

app.use('/pancs', pancRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;