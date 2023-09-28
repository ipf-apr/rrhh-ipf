const {DataTypes,sequelize} = require('../database/config');
const employee = require('./employee');
const skills = require('./skill')
const employeeSkills= sequelize.define('employeeSkills',{
    idEployeeSkills:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    idEmployee:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Employee',
            key: 'id'
        }
    },
    idSkill:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Skill',
            key:'idSkill'
        }
    }
},{
    sequelize,
    paranoid:true,
    modelName:'employeeSkill',
    tableName:'employeeSkills'
});
module.exports = employeeSkills;