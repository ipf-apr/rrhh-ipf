'use strict';


const {
  DataTypes, sequelize
} = require('../config/database');

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
  antiquity:{
    type: DataTypes.VIRTUAL,
    get() {
      const today = new Date();
      const date_in = new Date(this.dateIn);
      let antiquity = today.getFullYear() - date_in.getFullYear();
      let m = today.getMonth() - date_in.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < date_in.getDate())) {
        antiquity--;
      }
      return antiquity;
    }
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
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  paranoid: true,
  modelName: 'Employee',
  tableName: 'employees',
  underscored: true
});


console.log('Employee');
Employee.sync()

const Category = require('./category');
const CategoryEmployee = require('./categoryEmployee');

const Skill = require('./skill');
const EmployeeSkill = require('./employeeSkill');

const JobPosition = require('./jobPosition');
const EmployeeJobPosition = require('./employeeJobPosition');

Category.sync();
CategoryEmployee.sync();

Employee.belongsToMany(Category, { through: CategoryEmployee });
Employee.belongsToMany(Skill, { through: EmployeeSkill });
Employee.belongsToMany(JobPosition, { through: EmployeeJobPosition });


Category.belongsToMany(Employee, { through: CategoryEmployee });
Skill.belongsToMany(Employee, { through: EmployeeSkill });
JobPosition.belongsToMany(Employee, { through: EmployeeJobPosition });



module.exports = Employee;
