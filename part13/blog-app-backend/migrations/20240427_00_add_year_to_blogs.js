import { DataTypes } from 'sequelize';

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
      isWthitinRange(value) {
        if (value < 1991 || value > new Date().getFullYear()) {
          throw new Error('Year must be between 1991 and the current year');
        }
      },
    },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('blogs', 'year');
};

export { up, down };
