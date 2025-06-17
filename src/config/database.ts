import { DatabaseConfig } from '../interfaces/dataBaseConfig.interface';
import mysql from 'mysql2/promise';
import { ENV } from './env';

const dbConfig: DatabaseConfig = {
	host: ENV.DB_HOST,
	port: ENV.DB_PORT,
	user: ENV.DB_USER,
	password: ENV.DB_PASSWORD,
	database: ENV.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
};

// Criação do pool com tipagem
const pool = mysql.createPool(dbConfig);

// Exportação tipada
export default pool;