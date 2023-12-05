import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.ts";


class Meeting extends Model {
  id!: string;
  recall_bot_id!: string;
  date!: string;
  duration!: number;
  transcript!: string;
}

Meeting.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  recall_bot_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transcript: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Meeting',
  tableName: 'meetings',
  timestamps: false,
});

export default Meeting;