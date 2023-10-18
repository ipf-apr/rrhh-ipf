const { checkSchema } = require("express-validator");
const Category = require("../category.js");

const categorySchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "El campo nombre es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 3 },
      errorMessage:
        "El campo nombre admite un mínimo de 3 y un máximo de 50 caracteres.",
    },
    custom: {
      options: async (value, { req }) => {
        const { id } = req.params;
        return await Category.findOne({ where: { name: value } }).then(
          (category) => {
            if (category) {
              if (category?.id != id) {
                throw new Error(
                  "La categoría ya existe en la base de datos del sistema."
                );
              }
            }
          }
        );
      },
    },
  },
  permanency: {
    notEmpty: {
      errorMessage: "El campo permanencia es obligatorio",
    },
    isNumeric: {
      errorMessage: "El valor del campo permanencia debe ser un número",
    },
  },
});

module.exports = categorySchema;
