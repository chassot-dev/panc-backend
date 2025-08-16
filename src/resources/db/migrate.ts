import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './connection';

export const migrator = new Umzug({
  migrations: {
    glob: 'src/resources/db/migrations/*.ts',
    resolve: ({ name, path, context }) => {
      const migration = require(path!);
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

if (require.main === module) {
  (async () => {
    try {
      await migrator.up();
      console.log('Migrations aplicadas com sucesso!');
      process.exit(0);
    } catch (err) {
      console.error('Erro ao rodar migrations:', err);
      process.exit(1);
    }
  })();
}

export const runMigrations = async () => {
  await migrator.up();
};
