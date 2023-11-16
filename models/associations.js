const bcryptjs = require("bcryptjs");

const User = require('./user');
const Employee = require('./employee');
const Category = require('./category');

const JobPosition = require('./jobPosition');
const Skill = require('./skill');

const EmployeeSkill = require('./employeeSkill');
const EmployeeJobPosition = require('./employeeJobPosition');
const CategoryEmployee = require('./categoryEmployee');

User.hasMany(Employee);
Employee.belongsTo(User, {
  foreignKey: {
    name: 'userId'
  }
});

Employee.belongsToMany(Category, { through: CategoryEmployee });
Employee.belongsToMany(Skill, { through: EmployeeSkill,as: 'employeeSkills'});
Skill.belongsToMany(Employee, { through: EmployeeSkill, as: 'employeeSkills' });  
Employee.belongsToMany(JobPosition, { through: EmployeeJobPosition });


Category.belongsToMany(Employee, { through: CategoryEmployee });
Skill.belongsToMany(Employee, { through: EmployeeSkill });
JobPosition.belongsToMany(Employee, { through: EmployeeJobPosition });

