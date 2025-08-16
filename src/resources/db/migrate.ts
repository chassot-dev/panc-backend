import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './connection';

const migrator = new Umzug({
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


// Rodar migrations se chamar direto
if (require.main === module) {
  migrator.up().then(() => {
    console.log('Migrations aplicadas com sucesso!');
    process.exit(0);
  });
}
