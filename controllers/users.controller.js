const User = require('../models/user');
const bcryptjs = require("bcryptjs");



const indexView = (req, res) => {
  res.render('users/index')
};

const createView = (req, res) => {
  res.render('users/create')
};

const showView = (req, res) => {
  const userId = req.params.id;
  res.render('users/show', { id: userId })
}
const editView = (req, res) => {
  const userId = req.params.id;
  res.render('users/edit', { id: userId })
}


const index = async (req, res) => {
  try {
    const users = await User.findAll(
      {
        attributes: ['id', 'name', 'lastName', 'username', 'role', 'fullName']
      }
    );

    if (!users || users.length === 0) {
      throw ({
        status: 404,
        message: 'No hay usuarios registrados aún.'
      })
    }

    return res.json(users);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error interno del servidor'
    });
  }
}

const show = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'lastName', 'username', 'role', 'fullName']
    });

    if (!user) {
      throw {
        status: 404,
        message: "No existe el usuario con el id " + userId,
      };
    }

    return res.json(user);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const store = async (req, res) => {
  const {
    name,
    lastName,
    username,
    password = 'password',
    role
  } = req.body;

  let passHash = await bcryptjs.hash(password, 8);

  try {
    const user = await User.create({
      name,
      lastName,
      username,
      password: passHash,
      role
    });

    if (!user) {
      throw ({
        status: 400,
        message: 'No se pudo crear el usuario'
      })
    }

    return res.json({ user, message: 'El usuario se creó correctamente.' });

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
      role: role
    });
    return res.json({ user, message: 'El usuario se editó correctamente.' });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};


const destroy = async (req, res) => {
  const userId = req.params.id;
  try {

    if (userId == 1) {
      throw ({
        status: 401,
        message: 'No podes eliminar el primer usuario administrador.'
      })
    }

    const user = await User.destroy({
      where: {
        id: userId
      }
    });
    return res.json({ user, message: "Usuario eliminado correctamente." });

  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ status: error.status, message: error.message || "Error interno del servidor" });
  }
};

module.exports = {
  indexView,
  createView,
  showView,
  editView,
  index,
  show,
  update,
  store,
  destroy,
};