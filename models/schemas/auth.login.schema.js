const { checkSchema } = require("express-validator");

const loginSchema = checkSchema({
    username: {
        notEmpty: {
            errorMessage: "El campo nombre de usuario es obligatorio",
        },
        isLength: {
            options: { max: 50, min: 2 },
            errorMessage:
                "El campo nombre de usuario admite un mínimo de 2 y un máximo de 50 caracteres.",
        }       
    },
    password: {
        notEmpty: {
            errorMessage: "El campo contraseña es obligatorio",
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "La contraseña debe tener al menos 6 caracteres.",
        },
    }
});

module.exports = loginSchema;

