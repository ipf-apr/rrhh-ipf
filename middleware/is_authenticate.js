const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  // Leer el token

  let token;

  token = req.header("Authorization");
  respInJson = req.header("Accept");

  //esta parte se agregó para las páginas, ya que no se puede agregar el header a la petición GET
  if (!token) {
    token = req.cookies.jwt;
  }

  if (!token) {
    if (respInJson == "application/json") {
      return res.status(403).json({
        message:
          "No estás autenticado, tenes que iniciar sesión para continuar.",
      });
    } else {
      return res.redirect("/login");
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Leer el usuario que corresponde al id
    const user = await User.findByPk(decoded?.id);

    if (!user) {
      return res.status(401).json({
        message: "Token no válido - usuario no existe en la base de datos",
      });
    }

    // Verificar si el usuario está activo
    if (user.deletedAt) {
      return res.status(401).json({
        message: "Token no válido - usuario ya no existe.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("is_authenticate.js error", error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({
        message: "Tu sesión expiró, volvé a iniciar sesión.",
      });
    }
    return res.status(500).json({
      message: "Error de inesperado del servidor.",
    });
  }
};

module.exports = { isAuthenticated };
