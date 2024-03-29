'use strict';

const {
    DataTypes, sequelize
} = require('../config/database');


const JobPosition = sequelize.define('JobPosition', {
  position: DataTypes.STRING,  
  observations: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  paranoid: true,
  modelName: 'JobPosition',
  tableName: 'job_positions',
  underscored: true
});

console.log('JobPosition');

module.exports = JobPosition;
