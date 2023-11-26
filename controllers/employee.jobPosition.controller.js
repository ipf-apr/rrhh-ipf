const { sequelize } = require("../config/database");
const Employee = require("../models/employee");
const EmployeeJobPosition = require("../models/employeeJobPosition");
const JobPosition = require("../models/jobPosition");

const index = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await Employee.findByPk(employeeId, {
      include: JobPosition,
      order: [ [ JobPosition, 'position', 'DESC' ] ]
    });

    if (!employee) {
      throw {
        status: 404,
        message: "No existe el empleado con el id " + employeeId,
      };
    }

    return res.json(
      employee.JobPositions,
    );
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const update = async (req, res) => {
  const { employeeId, jobPositionId } = req.params;
  try {

    const categoryEmployee = await EmployeeJobPosition.findOne({
      where: {
        employeeId,
        jobPositionId
      },
    });

    categoryEmployee.update({
      datePromotion
    })


    return res.json({ categoryEmployee, message: 'La Categoría de este empleado se editó correctamente.' });

  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      message:
        error.message || "Error desconocido, consulte con el administrador.",
    });
  }

};

const store = async (req, res) => {
  const { employeeId, jobPositionId } = req.params;

  try {

    const [employeeJobPosition, created] = await EmployeeJobPosition.findOrCreate({
      where: {
        EmployeeId: employeeId,
        JobPositionId: jobPositionId,
      }
    });

    if (!created) {
      return res.status(200).json({
        message: "El puesto laboral ya esta agregado a este empleado.",
      });
    }

    if (!employeeJobPosition) {
      throw {
        status: 400,
        message: "No se pudo relacionar el Puesto Laboral al empleado",
      };
    }

    return res.status(201).json({
      employeeJobPosition,
      message: "Puesto Laboral agregado al empleado correctamente",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message:
        error.message || "Error desconocido, consulte con el administrador.",
    });
  }
};

const destroy = (req, res) => {
  const { employeeId, categoryId } = req.params;
  //TODO
};

module.exports = {
  index,
  update,
  store,
  destroy,
};
