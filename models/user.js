'use strict';

const {
  Model, DataTypes, sequelize
} = require('../database/config');

const Employee = require('./employee');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  lastName: { type: DataTypes.STRING },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.lastName + ', ' + this.name
    }
  },
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
Employee.belongsTo(User, {
  foreignKey: {
    name: 'userId'
  }
});

module.exports = User;

