'use strict';

const {
  Model, DataTypes, sequelize
} = require('../database/config');

const Employee = require('./employee')


const User = sequelize.define('User', {
  name: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING }
}, {
  sequelize,
  paranoid: true,
  modelName: 'User',
  tableName: 'users',
  underscored: true
})

User.hasMany(Employee, {
  foreignKey: 'user_id'
});
Employee.belongsTo(User);

User.sync();

module.exports = User;

