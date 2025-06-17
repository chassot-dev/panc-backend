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

  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  }
}
