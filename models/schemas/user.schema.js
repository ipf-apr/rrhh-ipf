const { checkSchema } = require("express-validator");

const User = require("../user");

const userSchema = checkSchema({
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
  username: {
    notEmpty: {
      errorMessage: "El campo username es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 2 },
      errorMessage:
        "El campo username admite un mínimo de 2 y un máximo de 50 caracteres.",
    },
    custom: {
      options: async (value, { req }) => {
        const { id } = req.params;
        return await User.findOne({ where: { username: value } }).then(
          (user) => {
            console.log(user?.id);
            if (user && user?.id != id) {
              throw new Error(
                "El usuario ya existe en la base de datos del sistema."
              );
            }
          }
        );
      },
    },
  },
  password: {
    notEmpty: {
      if: (value, { req }) => !req.params.id,
      errorMessage: "El campo contraseña es obligatorio",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "La contraseña debe tener al menos 6 caracteres.",
    },
  },
  role: {
    exists: {
      errorMessage: "El campo rol es obligatorio.",
    },
    notEmpty: {
      errorMessage: "El campo rol no puede estar vacio.",
    },
  },
});

module.exports = userSchema;
