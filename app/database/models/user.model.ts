import { Model, DataTypes } from "sequelize";
import { instanceDB } from "../connection";

export class UserModel extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare role: string;
  declare isActive: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "client"],
      defaultValue: "client",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: instanceDB.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    modelName: "users",
    sequelize: instanceDB,
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  }
);
