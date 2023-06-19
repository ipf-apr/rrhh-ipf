const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
//procedimiento de registro

const index = (req, res) => {
  res.render("index");
};

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
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.render("auth/login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y contraseña",
        alertIcon: "info",
        showConfirmButton: true,
        timer: null,
        ruta: "login",
        existUser: true,
      });
    } else {
      User.findOne({
        where: {
          username,
        },
      })
        .then(async function (user) {
          if (!user || !(await bcryptjs.compare(password, user.password))) {
            res.render("auth/login", {
              alert: true,
              alertTitle: "Advertencia",
              alertMessage: "Los datos ingresados no corresponden a nuestros registros.",
              alertIcon: "info",
              showConfirmButton: true,
              timer: null,
              ruta: "login",
              existUser: true,
            });
          } else {
            const { id, role } = user;
            const token = jwt.sign(
              { id: id, rol: role },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_TIEMPO_EXPIRA,
              }
            );
            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            res.render("auth/login", {
              alert: true,
              alertTitle: "Inicio de sesión correcto",
              alertMessage: "Se redireccionará en unos momentos...",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 2000,
              ruta: "",
              existUser: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  } catch (error) {
    console.log(error);
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
  index,
  register,
  login,
  loginPage,
  logout,
};
