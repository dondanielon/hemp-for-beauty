const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressStreet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressInt: {
        type: DataTypes.STRING,
      },
      addressCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressState: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressCol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(["failed", "processing", "succeeded", "sending"]),
        allowNull: false,
        defaultValue: "processing",
      },
    },
    { timestamps: false }
  );
};
