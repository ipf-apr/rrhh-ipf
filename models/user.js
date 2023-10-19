'use strict';

const {DataTypes, sequelize
} = require('../config/database');

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

console.log('User');

module.exports = User;

