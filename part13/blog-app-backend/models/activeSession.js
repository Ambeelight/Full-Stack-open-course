import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../util/db.js';

class ActiveSession extends Model {}

ActiveSession.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'active_session',
    tableName: 'active_sessions',
  }
);

export default ActiveSession;
