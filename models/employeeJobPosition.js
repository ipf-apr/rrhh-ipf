const {
    DataTypes, sequelize
} = require('../config/database');

const EmployeeJobPosition = sequelize.define('EmployeeJobPosition', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
}, {    
    modelName: 'EmployeeJobPosition',
    tableName: 'employee_job_position',
    underscored: true
});

console.log('EmployeeJobPosition');
module.exports = EmployeeJobPosition;