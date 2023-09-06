const JobPosition = require("../models/jobPosition");
const { Op } = require("sequelize");

//APIS
const index = async (req, res) => {
  const { position } = req.query;

  let whereCondition;
  
  if (position) {
    whereCondition = {
      position: {
        [Op.like]: `%${position}%`,
      },
    };
  }

  try {
    const jobPosition = await JobPosition.findAll({
      where: whereCondition,
    });
    console.log();
    if (!jobPosition || jobPosition.length === 0) {
      throw {
        status: 404,
        message: "No hay puestos laborales registrados aún.",
      };
    }
    return res.json(jobPosition);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor.",
    });
  }
};

const show = async (req, res) => {
  const jobPositionId = req.params.id;

  try {
    const jobPosition = await JobPosition.findByPk(jobPositionId);

    if (!jobPosition) {
      throw {
        status: 404,
        message: "No existe el puesto laboral con el id " + jobPositionId,
      };
    }

    return res.json(jobPosition);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const store = async (req, res) => {
  const { position } = req.body;

  try {
    const [jobPosition, created] = await JobPosition.findOrCreate({
      where: { position },
    });

    if (!created) {
      return res
        .status(200)
        .json({
          jobPosition,
          message:
            "El puesto laboral ya existe, se devolvió el puesto existente.",
        });
    }

    if (!jobPosition) {
      throw {
        status: 400,
        message: "No se pudo crear el puesto laboral.",
      };
    }

    return res
      .status(201)
      .json({ jobPosition, message: "Puesto laboral creado correctamente." });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor.");
  }
};

const update = async (req, res) => {
  const jobPositionId = req.params.id;
  const { position } = req.body;
  try {
    const jobPosition = await JobPosition.findByPk(jobPositionId);

    if (!jobPosition) {
      throw {
        status: 404,
        message: "No existe el puesto laboral con el id " + jobPositionId,
      };
    }

    jobPosition.update({
      position,
    });
    return res.json({
      jobPosition,
      message: "El puesto laboral se editó correctamente.",
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const destroy = async (req, res) => {
  const jobPositionId = req.params.id;
  try {
    const jobPosition = await JobPosition.destroy({
      where: {
        id: jobPositionId,
      },
    });
    return res.json({
      jobPosition,
      message: "Puesto laboral eliminado correctamente.",
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

module.exports = {
  index,
  show,
  update,
  store,
  destroy,
};
