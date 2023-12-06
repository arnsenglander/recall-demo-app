import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.ts";


class Meeting extends Model {
  get id() {
    return this.getDataValue('id');
  }

  get meeting_url() {
    return this.getDataValue('meeting_url');
  }

  get recall_bot_id() {
    return this.getDataValue('recall_bot_id');
  }
}

Meeting.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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