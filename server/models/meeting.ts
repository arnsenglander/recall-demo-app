import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.ts";


class Meeting extends Model {
  id!: string;
  recall_bot_id!: string;
  meeting_url!: string;
}

Meeting.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  recall_bot_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meeting_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Meeting',
  tableName: 'meetings',
});

export default Meeting;