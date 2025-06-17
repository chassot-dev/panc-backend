import db from './database';

export async function patchTables(): Promise<void> {
	try {

		await db.query(`
			CREATE TABLE IF NOT EXISTS users (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(250),
			email VARCHAR(250) UNIQUE,
			password VARCHAR(300)
			);
		`);

		console.log('Tabela "users" verificada/criada com sucesso!');

		await db.query(`
			CREATE TABLE IF NOT EXISTS permissions (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(250)
			);
		`);

		console.log('Tabela "permissions" verificada/criada com sucesso!');

		await db.query(`
			INSERT IGNORE INTO permissions (id, name)
			VALUES (1, 'ADMIN'), (2, 'USER');
		`);

		console.log('Permissões padrão inseridas com sucesso!');

		await db.query(`
			CREATE TABLE IF NOT EXISTS users_permissions (
				user_id INT,
				permission_id INT,
				PRIMARY KEY (user_id, permission_id),
				FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
				FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
			);
		`);

		console.log('Tabela "users_permissions" verificada/criada com sucesso!');

	} catch (err) {

		console.error('Erro ao criar tabela:', err);

	}
}
