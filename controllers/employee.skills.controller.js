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

    return res.json(employee.employeeSkills
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const store = async (req, res) => {
  const { employeeId, skillId } = req.params;
  try {

    const [skillEmployee, created] = await EmployeeSkill.findOrCreate({
      where: {
        EmployeeId: employeeId,
        SkillId: skillId,
      }
    });

    if (!created) {
      return res.status(200).json({
        message: "La habilidad ya fue agregada a este empleado.",
      });
    }
    if (!skillEmployee) {
      throw {
        status: 400,
        message: "No se pudo relacionar la habilidad al empleado",
      };
    }

    const skill = await Skill.findByPk(skillId);

    return res.status(201).json({
      skill,
      message: "Habilidad agregada al empleado correctamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno del servidor!' })
  }
};
module.exports = {
  store,
  index
}
