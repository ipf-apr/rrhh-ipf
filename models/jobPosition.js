'use strict';

const {
    DataTypes, sequelize
} = require('../database/config');


const JobPosition = sequelize.define('JobPosition', {
  position: DataTypes.STRING,  
  observations: DataTypes.TEXT
}, {
  sequelize,
  paranoid: true,
  modelName: 'JobPosition',
  tableName: 'job_positions',
  underscored: true
});

console.log('JobPosition');
JobPosition.sync()

module.exports = JobPosition;
