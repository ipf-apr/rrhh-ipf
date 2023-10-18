const { checkSchema } = require("express-validator");
const Skill = require("../skill.js");

const skillSchema = checkSchema({
    nameSkill: {
        notEmpty: {
            errorMessage: "El campo nombre de habilidad es obligatorio",
        },
        isLength: {
            options: { max: 50, min: 3 },
            errorMessage:
                "El campo nombre de habilidad admite un mínimo de 3 y un máximo de 50 caracteres.",
        },
        custom: {
            options: async (value, { req }) => {
                const { skillId } = req.params;
                return await Skill
                    .findOne({ where: { nameSkill: value } })
                    .then((skill) => {
                        if (skill && skill?.id != id) {
                            throw new Error(
                                "El nombre de habilidad ya existe en la base de datos del sistema."
                            );
                        }
                    });
            },
        },
    }
});

module.exports = skillSchema;