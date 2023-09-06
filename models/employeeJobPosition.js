const {
    DataTypes, sequelize
  } = require('../database/config');
  
  const EmployeeJobPosition = sequelize.define('EmployeeJobPosition', {
      employeeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'employees',
              key: 'id'
          }
      },
      jobPositionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'job_positions',
              key: 'id'
          }
      }
  }, {
      sequelize,
      paranoid: true,
      modelName: 'EmployeeJobPosition',
      tableName: 'employee_job_position',
      underscored: true
  });
  
  console.log('EmployeeJobPosition');
  EmployeeJobPosition.sync();
  module.exports = EmployeeJobPosition;