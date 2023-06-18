'use strict';

const {
  Model, DataTypes, sequelize
} = require('../database/config');

const User = require('./user');

const Employee = sequelize.define('Employee', {
  name: DataTypes.STRING,
  lastName: DataTypes.STRING,
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.lastName + ', ' + this.name
    }
  },
  dni: DataTypes.STRING,
  phone: DataTypes.STRING,
  dateBirthday: {
    type: DataTypes.DATEONLY,
  },
  profileNro: DataTypes.STRING,
  address: {
    type: DataTypes.STRING,
  },
  dateIn: {
    type: DataTypes.DATEONLY
  },
  promotion: { 
    type: DataTypes.INTEGER, 
    defaultValue: 1 
  },
  age: {
    type: DataTypes.VIRTUAL,
    get() {
      const today = new Date();
      const date_b = new Date(this.dateBirthday);
      let age = today.getFullYear() - date_b.getFullYear();
      let m = today.getMonth() - date_b.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < date_b.getDate())) {
        age--;
      }
      return age;
    }
  },
}, {
  sequelize,
  paranoid: true,
  modelName: 'Employee',
  tableName: 'employees',
  underscored: true
});

module.exports = Employee;
