const {DataTypes, sequelize} = require('../config/database');


const Skill = sequelize.define('Skill',{    
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


module.exports = Skill;