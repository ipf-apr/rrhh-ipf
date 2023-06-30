const Category = require("../models/category");
const Employee = require("../models/employee");
const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//VISTAS
const indexView = (_req, res) => {
  res.render("categories/index");
};

const showView = (req, res) => {
  const categoryId = req.params.id;
  res.render('categories/show', { id: categoryId });
};

const createView = (_req, res) => {
  res.render("categories/create");
};

const editView = (req, res) => {
  const categoryId = req.params.id;
  res.render("categories/edit", { id: categoryId });
};

//APIS
const index = async (req, res) => {

  const { name } = req.query;

  try {
    const categories = await Category.findAll({
      where:{       
        name: {
          [Op.like] : `%${name}%`
        }
      }
    });
    
    if (!categories || categories.length === 0) {
      throw {
        status: 404,
        message: "No hay categorias registradas aún.",
      };
    }
    return res.json(categories);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
};

const show = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);
    

    if (!category) {
      throw {
        status: 404,
        message: "No existe el categoria con el id " + categoryId,
      };
    }

    return res.json(category);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};


const store = async (req, res) => {
  const {
    name,permanency
  } = req.body;

  try {
    const [category, created] = await Category.findOrCreate({
      where: { name },
      defaults: {
        permanency
      },
    });

    if (!category) {
      throw {
        status: 400,
        message: "No se pudo crear el categoria.",
      };
    }

    return res.json(category);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const update = async (req, res) => {
  const categoryId = req.params.id;
  const {
    name, permanency
  } = req.body;
  try {
    const category = await Category.findByPk(categoryId);
    category.update({
        name, permanency
    });
    return res.json(category);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const destroy = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.destroy({
      where: {
        id: categoryId
      }
    });
    return res.json({ category, message: "categoria eliminada correctamente." });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

module.exports = {
  indexView,
  index,
  showView,
  show,
  editView,
  update,
  createView,
  store,
  destroy,
};
