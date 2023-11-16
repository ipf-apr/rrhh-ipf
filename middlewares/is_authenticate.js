const jwt = require("jsonwebtoken");

const User = require("../models/user");
const verifyJWT = require("../utils/verifyJWT");

const isAuthenticated = async (req, res, next) => {
  // Leer el token

  const  token =  req.cookies.jwt || req.header("Authorization");

  const respInJson = req.header("Accept")?.includes("application/json");
  
  //esta parte se agregó para las páginas, ya que no se puede agregar el header a la petición GET
  
  if (!token) {
    if (respInJson) {
      return res.status(403).json({
        message:
          "No estás autenticado, tenes que iniciar sesión para continuar.",
      });
    } else {
      return res.redirect("/login");
    }
  }

  try {
        const jwt = await verifyJWT(token);
        // Leer el usuario que corresponde al id
        const user = await User.findByPk(jwt?.id);
        
    if (!user) {
      if (respInJson) {
          return res.status(401).json({
            message: "Token no válido - usuario no existe en la base de datos",
          });
      } else {
        res.clearCookie('jwt')
        return res.redirect("/login");
      }
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
    if (error instanceof jwt.TokenExpiredError) {
      console.log("is_authenticate.js error", error);
      if (!respInJson) {              
        return res.redirect("/login");
      }

      return res.status(403).json({
        message: "Tu sesión expiró, volvé a iniciar sesión.",
      });
    }
    console.log(error);
    return res.status(500).json({
      message: "Error de inesperado del servidor.",
    });
  }
};

module.exports = { isAuthenticated };
