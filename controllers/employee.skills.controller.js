const Skill = require('../models/skill');
const Employee = require('../models/employee');
const EmployeeSkill = require('../models/employeeSkill');

const index = async( req,res) =>{
    const {employeeId} = req.params;

    try {
        
        const employee = await Employee.findByPk(employeeId,{
            include:[Skill],
            order:[[Skill,'name','ASC']]
        });

        if(!employee){
            throw{
                status:404,
                message:'EL empleado no existe'
            }
        };

        return res.json({
            data:employee.Skills
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor!'})
    }
};
const store = async (req,res)=>{
    const {employeeId,skillId} = req.params;

    try {
        let employeeSkill = await EmployeeSkill.findOne({
            where:{
                employeeId,
                skillId,
            }
        });

        if(employeeSkill?.idSKill === +skillId){
            return res.status(200).json({
                message:'La skill ya fue agregada a este empleado'
            })
        }else{
            employeeSkill = await EmployeeSkill.create({
                idEmployee: employeeId,
                idSkill: skillId,
            });
            
        };

        if(!employeeSkill){
            throw{
                status:400,
                message:'Error al agregar la skill'
            }
        };
        return res.status(201).json({message:'La skill fue agregada'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor!'})
    }
};

module.exports = {
    store,
    index
}
