import { DataTypes } from 'sequelize';

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('readingLists', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogs',
        key: 'id',
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('readingLists');
};

export { up, down };
