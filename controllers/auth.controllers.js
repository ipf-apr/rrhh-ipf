const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");



const register = async (req, res) => {
  try {
    const { name, lastName, username, password, passwordConfirmation } = req.body;

    let passHash = await bcryptjs.hash(password, 8);

    // console.log(passHash);
    const user = await User.create({
      name: name,
      lastName: lastName,
      username: username,
      password: passHash,
      role: 'admin',
    });

    if (user) {
      return res.json({
        message: 'Usuario Administrador creado correctamente, se redireccionará en unos momentos.',
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al registrar usuario.',
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({
        message: "Las credenciales no corresponden a nuestros registros."
      })
    }
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Los datos ingresados no corresponden a nuestros registros."
      })
    }

    const { id, role } = user;

    const token = jwt.sign(
      { id: id, rol: role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIEMPO_EXPIRA,
      });

    //se agregó cookies para poder navegar con autorización, ya que se verifica en todas las páginas protegidas
    const cookiesOptions = {
      expires: new Date(
        Date.now() +
        process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", token, cookiesOptions);

    return res.json({
      message: 'Inicio de sesión correcto, se redireccionará en unos momentos',
      token,
    });



  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al iniciar sesión',
    });
  }
};



const loginPage = async (_req, res) => {
  try {
    User.findAll({
      attributes: ["id"],
      limit: 1,
    }).then((users) => {
      console.log(users.length);
      if (users.length === 0) {
        res.render("auth/login", { alert: false, existUser: false });
      } else {
        res.render("auth/login", { alert: false, existUser: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};

module.exports = {
  register,
  login,
  loginPage,
  logout,
};
