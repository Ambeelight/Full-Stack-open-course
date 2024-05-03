import { DataTypes } from 'sequelize';

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
  await queryInterface.createTable('active_sessions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'disabled');
  await queryInterface.dropTable('active_sessions');
};

export { up, down };
