// src/db/connection.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME ?? '';
const dbUser = process.env.DB_USER ?? '';
const dbPass = process.env.DB_PASSWORD ?? '';
const dbHost = process.env.DB_HOST ?? '';
const dbPort = Number(process.env.DB_PORT ?? 3306);

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false,
});
