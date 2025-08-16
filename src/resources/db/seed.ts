import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './connection';

export const seeder = new Umzug({
  migrations: {
    // Glob pattern para os arquivos de seed
    glob: 'src/resources/db/seeders/*.ts', 
    resolve: ({ name, path, context }) => {
      const seed = require(path!);
      return {
        name,
        up: async () => seed.up(context),
        down: async () => seed.down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    tableName: 'SequelizeDataSeeders', // tabela para controlar quais seeders já rodaram
  }),
  logger: console,
});

// Rodar seeders se chamar o arquivo diretamente
if (require.main === module) {
  (async () => {
    console.log("TESE")
    try {
      await seeder.up();
      console.log('Seeders aplicados com sucesso!');
      process.exit(0);
    } catch (err) {
      console.error('Erro ao rodar seeders:', err);
      process.exit(1);
    }
  })();
}

// Função exportada para rodar seeders programaticamente
export const runSeeders = async () => {
  await seeder.up();
};
