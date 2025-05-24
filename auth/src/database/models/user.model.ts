import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const User = sequelize.define(
  "User",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users"
  }
);

export default User;
