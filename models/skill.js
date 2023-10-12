const {DataTypes, sequelize} = require('../config/database');


const Skill = sequelize.define('Skill',{
    idSkill:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nameSkill:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    sequelize,
    paranoid:true,
    modelName:'Skill',
    tableName:'skills'
});

Skill.sync()

module.exports = Skill;