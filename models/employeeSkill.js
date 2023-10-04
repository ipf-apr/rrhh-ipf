const {DataTypes,sequelize} = require('../database/config');

const EmployeeSkill= sequelize.define('EmployeeSkill',{
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
    tableName:'EmployeeSkill'
});

module.exports = EmployeeSkill;