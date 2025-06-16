const db = require('./database');

async function criarTabelas() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(250),
        email VARCHAR(250) UNIQUE,
        senha VARCHAR(300)
      );
    `);

    console.log('Tabela "usuarios" verificada/criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  }
}

module.exports = criarTabelas;
