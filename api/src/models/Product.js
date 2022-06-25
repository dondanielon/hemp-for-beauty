const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    specs: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    }, { timestamps: false }
  );
};