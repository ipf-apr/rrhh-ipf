const { DataTypes, sequelize } = require('../config/database');

const EmployeeSkill = sequelize.define('EmployeeSkill', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
}, {
    modelName: 'EmployeeSkill',
    tableName: 'employee_skill',
    underscored: true
});

module.exports = EmployeeSkill;