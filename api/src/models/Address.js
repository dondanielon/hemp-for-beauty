const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Address", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    int: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    city: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    state: { 
        type: DataTypes.STRING,
        allowNull: false
    }, 
    col: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, { timestamps: false }
  );
};
