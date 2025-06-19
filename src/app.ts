import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from "cors";
import morgan from 'morgan';
import { patchTables } from './config/setup';
import userRouter from './routes/user.routes';
import permissionRouter from './routes/permission.routes';
import transactionTypeRouter from './routes/transactionTypes.routes'
import transactionRouter from './routes/transaction.routes'
import { errorHandler } from './middlewares/error.middleware';
import { apiKeyMiddleware } from './middlewares/apiKey.middleware';


const app: Application = express();


// Verifica que está tudo certo com o banco
patchTables();

// Configurações do Express
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(apiKeyMiddleware);

// Rotas
app.use('/users', userRouter);
app.use('/permissions', permissionRouter);
app.use('/transactionTypes', transactionTypeRouter);
app.use('/transactions', transactionRouter);

// Tratamento de erro 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use(errorHandler);


// KEEP LISTENING //
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;