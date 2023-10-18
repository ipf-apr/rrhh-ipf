const { DataTypes, sequelize } = require("../config/database");

const CategoryEmployee = sequelize.define(
  "CategoryEmployee",
  {
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
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
// CategoryEmployee.sync();
module.exports = CategoryEmployee;
