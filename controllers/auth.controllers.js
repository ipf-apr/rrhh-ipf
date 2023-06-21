const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");



const register = async (req, res) => {
  try {
    const { name, lastName, username, password, passwordConfirmation } = req.body;

    if (!username || !password) {

      return res.render("auth/login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y contraseña",
        alertIcon: "info",
        showConfirmButton: true,
        timer: null,
        ruta: "login",
        existUser: false,
      });

    }

    if (password !== passwordConfirmation) {

      return res.render("auth/login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Las contraseñas no coinciden",
        alertIcon: "info",
        showConfirmButton: true,
        timer: null,
        ruta: "login",
        existUser: false,
      });

    }

    let passHash = await bcryptjs.hash(password, 8);

    // console.log(passHash);
    User.create({
      name: name,
      lastName: lastName,
      username: username,
      password: passHash,
      role: 'admin',
    })
      .then((user) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {

      return res.status(400).json({
        message: 'Ingrese un usuario y contraseña.',
      });
    } else {

      const user = await User.findOne({
        where: {
          username,
        },
      });


      const validPassword = await bcryptjs.compare(password, user.password);

      if (!user || !validPassword) {
        return res.status(400).json({
          message: 'Los datos ingresados no corresponden a nuestros registros.',
        });
      } else {
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

      }
    }
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
