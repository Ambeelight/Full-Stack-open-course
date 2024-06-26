import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { Umzug, SequelizeStorage } from 'umzug';

config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigration = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await runMigration();
    console.log('connected to the database');
  } catch (error) {
    console.log('failed to connect to the database', error);
    return process.exit(1);
  }

  return null;
};

export { connectToDB, sequelize, rollbackMigration };
