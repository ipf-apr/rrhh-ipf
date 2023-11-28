const Skill = require("../models/skill");
const { Op } = require("sequelize");

//VISTAS
const indexView = (_req, res) => {
  res.render("skills/index.ejs");
};

//apis

const findAll = async (req, res) => {
  const { nameSkill } = req.query;
  try {
    const skills = await Skill.findAll({
      where: {
        nameSkill: {
          [Op.like]: `%${nameSkill ?? ''}%`
        }
      }
    });

    if (!skills || skills.length === 0) {
      throw {
        status: 404,
        message: "No hay habilidades registradas aún.",
      };
    }
    return res.status(200).json(skills);
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({
        message:
          error.message ||
          "error interno del servidor al obtener las habilidades",
      });
  }
};
const findOne = async (req, res) => {
  const { skillId } = req.params.id;
  try {
    const skill = Skill.findByPk(skillId);
    if (!skill) {
      throw {
        status: 404,
        message: "La habilidad buscada no existe!",
      };
    }
    return res.status(200).json(skill);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Error interno del servidor!" });
  }
};
const createSkill = async (req, res) => {
  const { nameSkill } = req.body;
  try {
    const [skill, created] = await Skill.findOrCreate({
      where: {
        nameSkill,
      },
    });
    if (!created) {
      return res.status(200).json({ skill, message: 'Habilidad ya existe.' });
    }
    return res.status(201).json({ skill, message: 'Habilidad creada correctamente.' });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
};
const skillUpdate = async (req, res) => {
  const skillId = req.params.skillId;
  const { nameSkill } = req.body;

  try {
    const skill = await Skill.findByPk(skillId);

    skill.update({
      nameSkill,
    });
    if (!skill) {
      throw {
        status: 400,
        message: "Error al actualizar la Habilidad!",
      };
    }
    return res.status(200).json({ skill, message: "Actualizado con Éxito!" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error interno del Servidor!" });
  }
};

const deleteSkill = async (req, res) => {
  const { skillId } = req.params;
  try {
    const skill = await Skill.destroy({
      where: {
        id: skillId
      },
    });
    if (!skill) {
      throw {
        status: 400,
        message: "Error al eliminar la Habilidad!",
      };
    }
    return res.status(200).json({ message: "Habilidad Eliminada con Éxito!" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status)
      .json({ message: error.message || "Error interno del Servidor!" });
  }
};
module.exports = {
  indexView,
  findAll,
  findOne,
  createSkill,
  skillUpdate,
  deleteSkill,
};
