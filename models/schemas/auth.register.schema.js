const { checkSchema } = require("express-validator");

const User = require("../user");

// name, lastName, username, password, passwordConfirmation

const registerSchema = checkSchema({
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
                        console.log(user);
                        if (user?.id != id) {
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
            errorMessage: "El campo contraseña es obligatorio",
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "La contraseña debe tener al menos 6 caracteres.",
        },
    },
    passwordConfirmation: {
        custom: {
            options: async (passwordConfirmation, { req }) => {
                const { password } = req.body;
                if (password !== passwordConfirmation) {
                    throw new Error('Las contraseñas deben coincidir.')
                }
            },
        },
    },
});

module.exports = registerSchema;

