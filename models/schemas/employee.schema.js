const { checkSchema } = require("express-validator");

const Employee = require("../employee");

const employeeSchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "El campo nombre es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 4 },
      errorMessage:
        "El campo nombre admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: "El campo apellido es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 4 },
      errorMessage:
        "El campo apellido admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
  },
  dni: {
    notEmpty: {
      errorMessage: "El campo dni es obligatorio",
    },
    isLength: {
      options: { max: 10, min: 8 },
      errorMessage:
        "El campo dni admite un mínimo de 8 y un máximo de 10 caracteres.",
    },
  },
  phone: {
    notEmpty: {
      errorMessage: "El campo número de teléfono es obligatorio",
    },
    isLength: {
      options: { max: 12, min: 10 },
      errorMessage:
        "El campo número de teléfono admite un mínimo de 10 y un máximo de 12 caracteres.",
    },
  },
  dateBirthday: {
    isISO8601: {
      errorMessage: "El campo fecha de nacimiento debe ser una fecha",
    },
    isBefore: {
      date: "01-01-2005",
      errorMessage: "La persona debe ser mayor de edad",
    },
  },
  profileNro: {
    exists: {
      errorMessage: "El campo número de perfíl es obligatorio",
    },
    custom: {
      options: async (value, { req }) => {
        const { id } = req.params;
        console.log('const { id } = req.params;')
        console.log(value);
        return await Employee.findOne({ where: { profileNro: value } }).then(
          (employee) => {
            if (employee?.id != id) {
              throw new Error(
                "El número de perfíl ya existe en la base de datos del sistema."
              );
            }
          }
        );
      },
    },
  },
  address: {
    optional: true,
    isLength: {
      options: { max: 50, min: 4 },
      errorMessage:
        "El campo dirección admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
  },
  dateIn: {
    isISO8601: {
      errorMessage: "El campo fecha de ingreso debe ser una fecha",
    },
    isBefore: {
      date: Date.now(),
      errorMessage: "El valor del campo debe ser antes de la fecha actual",
    },
  },
  promotion: {
    optional: true,
    isBoolean: {
      errorMessage: "El valor del campo promoción debe ser verdadero o falso",
    },
  },
});

module.exports = employeeSchema;
