const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT
    }
    }, { timestamps: false }
  );
};