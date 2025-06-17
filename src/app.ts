import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { patchTables } from './config/setup';
import userRouter from './routes/user.routes';
import { errorHandler } from './middlewares/error.middleware';


const app: Application = express();

// Verifica que está tudo certo com o banco
patchTables();

// Configurações do Express
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/user', userRouter);

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