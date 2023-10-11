const { checkSchema } = require("express-validator");

const Category = require("../category");
const Employee = require("../employee");



const categoryEmployee = checkSchema({
  employeeId: {       
    custom: {
      options: async (value, { req }) => {
        console.log('const { employeeId } = req.params;');
        console.log(value);
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
  categoryId: {  
    custom: {
      options: async (value, { req }) => {
        const { categoryId } = req.params;
        return await Category.findByPk(categoryId).then(
          (category) => {
            console.log(user);
            if (!category) {
              throw new Error(
                "La categoría NO existe en la base de datos del sistema."
              );
            }
          }
        );
      },
    },
  },
  datePromotion: {
    isISO8601: {
      errorMessage: "El campo fecha de promoción debe ser una fecha",
    }
  },
});

module.exports = categoryEmployee;
