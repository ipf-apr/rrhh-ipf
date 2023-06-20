const { error } = require('console');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
//obteneer usuarios
const index = async (req, res) => {
  try {
      const usurios = await User.findAll({
          where: {
              estado: true,
              id: req.usuario.id
          }
      });

      if (!tareas || tareas.length === 0) {
          throw ({
              status: 404,
              message: 'No hay tareas registradas'
          })
      }

      return res.json(tareas);
  } catch (error) {
      return res.status(error.status || 500).json({
          message: error.message || 'Error interno del servidor'
      });
  }
}

const show = async (req,res)=>{
    const userId = req.params.id;

  await User.findByPk(userId)
    .then((users)=>{
        res.render('users/show',{usuarios});
    })
    .catch((error)=>{
        throw error;
    });
};

const created = (req,res)=>{
    let usuario = User.build();
    res.render('users/create',{usuarios})
};

const store = async (req, res) => {
    const {
      name,
      lastName,
      username,
      role
    } = req.body;
}  
// const jwtDecodificado = await promisify(jwt.verify)(
//   req.cookies.jwt,
//   process.env.JWT_SECRET
// );
// Ctrl para crear una tarea
const create = async (req, res) => {
  const {
    name,
    lastName,
    username,
    role
  } = req.body;

  try {
      const user = await User.create({
        name,
        lastName,
        username,
        role,
        id: req.usuario.id
      });

      if (!user) {
          throw ({
              status: 400,
              message: 'No se pudo crear la tarea'
          })
      }

      return res.json(tarea);
  } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
  }
}
const update = async (req, res) => {
    const userId = req.params.id;
    const {
        name,
        lastName,
        username,
        role
      } = req.body;
    try {
      const user = await User.findByPk(userId);
      user.update({
        name,
        lastName,
        username: username,
        role:role,
        userId: jwtDecodificado.id,
      });
      res.render("users/show", { usuarios });
    } catch (error) {
      throw error;
    }
  };


  const destroy = (req, res) => {};

  module.exports = {
    index,
    show,
    update,
    created,
    store,
    destroy,
  };