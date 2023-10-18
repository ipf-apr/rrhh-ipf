'use strict';

const {
    DataTypes, sequelize
} = require('../config/database');


const Category = sequelize.define('Category', {
  name: DataTypes.STRING,
  permanency: { 
    type: DataTypes.INTEGER, 
    defaultValue: 1 
  }
}, {
  sequelize,
  paranoid: true,
  modelName: 'Category',
  tableName: 'categories',
  underscored: true
});

console.log('Category');
Category.sync()

module.exports = Category;
