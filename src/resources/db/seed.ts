import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './connection';

export const seeder = new Umzug({
  migrations: {
    glob: 'src/resources/db/seeders/*.ts',
    resolve: ({ name, path, context }) => {
      const seed = require(path!);
      return {
        name,
        up: async () => seed.up(),
        down: async () => seed.down(),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'seeder_meta' }),
  logger: console,
});

export const runSeeders = async () => {
  await seeder.up();
};

if (require.main === module) {
  (async () => {
    try {
      await runSeeders();
      console.log('Seeders aplicados com sucesso!');
      process.exit(0);
    } catch (err) {
      console.error('Erro ao rodar seeders:', err);
      process.exit(1);
    }
  })();
}
