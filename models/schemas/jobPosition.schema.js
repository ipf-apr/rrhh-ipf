const { checkSchema } = require("express-validator");
const jobPosition = require("../jobPosition.js");

const jobPositionSchema = checkSchema({
  position: {
    notEmpty: {
      errorMessage: "El campo posición es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 3 },
      errorMessage:
        "El campo posición admite un mínimo de 3 y un máximo de 50 caracteres.",
    },
    custom: {
      options: async (value, { req }) => {
        const { id } = req.params;
        console.log(req.params);
        return await jobPosition
          .findOne({ where: { position: value } })
          .then((jobPosition) => {
            if (jobPosition && jobPosition?.id != id) {
              throw new Error(
                "El puesto ya existe en la base de datos del sistema."
              );
            }
          });
      },
    },
  },
  observations: {
    optional: true,
  },
});

module.exports = jobPositionSchema;
