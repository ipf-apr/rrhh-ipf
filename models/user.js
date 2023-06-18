'use strict';

const {
  Model, DataTypes, sequelize
} = require('../database/config');

const Employee = require('./employee');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  lastName: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING(50) },
  password: { type: DataTypes.STRING(100) },
  role: { type: DataTypes.STRING(20) }
}, {
  sequelize,
  paranoid: true,
  modelName: 'User',
  tableName: 'users',
  underscored: true
})

User.hasMany(Employee);
Employee.belongsTo(User);

module.exports = User;

