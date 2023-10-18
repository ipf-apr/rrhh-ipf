const { checkSchema } = require("express-validator");

const Employee = require("../employee");
const JobPosition = require("../jobPosition");

const employeeJobPosition = checkSchema({
  employeeId: {       
    custom: {
      options: async (value, { req }) => {
        const { employeeId } = req.params;
        return await Employee.findByPk(employeeId).then(
          (emp) => {
            if (!emp) {
              throw new Error(
                "El empleado no existe en la base de datos del sistema."
              );
            }
          }
        );
      },
    },
  },
  jobPositionId: {  
    custom: {
      options: async (value, { req }) => {
        const { jobPositionId } = req.params;
        return await JobPosition.findByPk(jobPositionId).then(
          (jobPosition) => {
            if (!jobPosition) {
              throw new Error(
                "La categoría NO existe en la base de datos del sistema."
              );
            }
          }
        );
      },
    },
  }
});

module.exports = employeeJobPosition;
