const Skill = require('../models/skill');
const Employee = require('../models/employee');
const EmployeeSkill = require('../models/employeeSkill');

const index = async (req, res) => {
    const { employeeId } = req.params;
  
    try {
      const employee = await Employee.findByPk(employeeId, {
        include: [
          {
            model: Skill,
            as: 'employeeSkills', 
            through: {
              attributes: [] 
            }
          }
        ]
      });
  
      if (!employee) {
        throw {
          status: 404,
          message: 'El empleado no existe',
        };
      }
  
      return res.json({
        data: employee.employeeSkills, 
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
const store = async (req,res)=>{
    const {employeeId} = req.params;
    const {skillId} = req.body;
    try {
        const employee = await Employee.findOne({
            employee_id: employeeId, 
        });
        const skill = await Skill.findByPk(skillId);
        console.log(skill)
        let employeeSkill = await EmployeeSkill.findOne({
            where:{
                employee_id:employeeId,
                skill_id:skillId,
            }
        });

        if(employeeSkill?.idSKill === +skillId){
            return res.status(200).json({
                message:'La skill ya fue agregada a este empleado'
            })
        }else{
            await employee.addEmployeeSkill(skill);
            return res.status(201).json({message:'La skill fue agregada'})
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor!'})
    }
};
module.exports = {
    store,
    index
}
