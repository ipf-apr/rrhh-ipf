const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { User } = require("../models/index");
const { promisify } = require("util");
//procedimiento de registro

const index = (req, res) => {
  res.render("index");
};

const registerForm = (req, res) => {
  res.render("auth/register");
};

const register = async (req, res) => {
  try {
    const fu = req.body.fu;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const pass = req.body.password;
    const passConfirmation = req.body.passwordConfirmation;
    const rol = req.body.rol;

    if (!username || !pass) {
      if (fu) {
        return res.render("auth/login", {
          alert: true,
          alertTitle: "Advertencia",
          alertMessage: "Ingrese un usuario y contraseña",
          alertIcon: "info",
          showConfirmButton: true,
          timer: false,
          ruta: "login",
          existUser: false,
        });
      }

      return res.render("/register", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y contraseña",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "register",
      });
    }

    if (pass !== passConfirmation) {
      if (fu) {
        return res.render("auth/login", {
          alert: true,
          alertTitle: "Advertencia",
          alertMessage: "Las contraseñas no coinciden",
          alertIcon: "info",
          showConfirmButton: true,
          timer: false,
          ruta: "login",
          existUser: false,
        });
      }
      return res.render("/register", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Las contraseñas no coinciden",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "register",
      });
    }

    let passHash = await bcryptjs.hash(pass, 8);

    // console.log(passHash);
    User.create({
      name: name,
      lastName: lastName,
      username: username,
      password: passHash,
      role: rol,
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
        timer: false,
        ruta: "login",
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
              alertMessage: "Usuario y/o Contraseña Incorrecto/s!",
              alertIcon: "info",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
              existUser: true,
            });
          } else {
            const id = user.id;
            const role = user.role;
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

const isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    const jwtDecodificado = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    User.findOne({
      where: {
        id: jwtDecodificado.id,
      },
    })
      .then((user) => {
        if (!user) {
          return next();
        }
        req.user = user;
        return next();
      })
      .catch((error) => {
        console.log(error);
        return next();
      });
  } else {
    res.redirect("/login");
  }
};

const loginPage = async (req, res) => {
  try {
    User.findAll({
      where: {
        id: 1,
      },
    }).then((users) => {
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
  registerForm,
  register,
  login,
  isAuthenticated,
  loginPage,
  logout,
};
