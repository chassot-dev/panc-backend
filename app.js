require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const authRoutes = require('./src/routes/auth.routes');
const criarTabelas = require('./src/config/setup');

const app = express();

// Verifica que está tudo certo com o banco
criarTabelas();

// Configurações do Express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRoutes);

// Tratamento de erro 404
app.use((req, res, next) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

module.exports = app;
