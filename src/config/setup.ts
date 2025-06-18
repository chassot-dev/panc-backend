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

		await db.query(`
			CREATE TABLE IF NOT EXISTS transaction_types (
				id INT AUTO_INCREMENT PRIMARY KEY,
				name VARCHAR(100) NOT NULL UNIQUE,
				is_expense BOOLEAN NOT NULL
			);
		`);

		console.log('Tabela "transaction_types" verificada/criada com sucesso!');

		await db.query(`
			INSERT IGNORE INTO transaction_types (id, name, is_expense)
			VALUES (1, 'Mercado', true), (2, 'Salário', false);
		`);

		console.log('Tabela "transaction_types" verificada/criada com sucesso!');

		await db.query(`
			CREATE TABLE IF NOT EXISTS transactions (
				id INT AUTO_INCREMENT PRIMARY KEY,
				user_id INT NOT NULL,
				amount DECIMAL(10, 2) NOT NULL,
				type_id INT NOT NULL,
				transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION,
				FOREIGN KEY (type_id) REFERENCES transaction_types(id) ON DELETE NO ACTION
			);
		`);

		console.log('Tabela "transactions" verificada/criada com sucesso!');

	} catch (err) {

		console.error('Erro ao criar tabela:', err);

	}
}
