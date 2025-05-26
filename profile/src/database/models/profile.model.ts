import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const Profile = sequelize.define(
  "Profile",
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
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    tableName: "profiles",
  }
);

export default Profile;
