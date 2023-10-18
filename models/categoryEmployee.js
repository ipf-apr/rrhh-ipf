const { DataTypes, sequelize } = require("../config/database");

const CategoryEmployee = sequelize.define(
  "CategoryEmployee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    datePromotion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    modelName: "CategoryEmployee",
    tableName: "category_employee",
    underscored: true,
  }
);

console.log("CategoryEmployee");
module.exports = CategoryEmployee;
