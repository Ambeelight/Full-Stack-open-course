import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

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

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to the database');
  } catch (error) {
    console.log('failed to connect to the database');
    return process.exit(1);
  }

  return null;
};

export { connectToDB, sequelize };
