const { DataTypes } = require("sequelize");
require("dotenv").config();

module.exports = (sequelize) => {
  sequelize.define("User", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(3),
        defaultValue: process.env.USER_ROLE,
      },
    }, { timestamps: false }
  );
};
