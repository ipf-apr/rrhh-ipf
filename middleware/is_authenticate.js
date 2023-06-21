const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  // Leer el token

  let token = req.header('Authorization');

  //esta parte se agregó para las páginas, ya que no se puede agregar el header a la petición GET
  if (!token) {
      token = req.cookies.jwt;  
      console.log('req.cookies.jwt');  
  }

 
  
  if (!token) {
    return res.status(401).json({
      message: 'No hay token en la petición',
    });
  }

  try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        // Leer el usuario que corresponde al id
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                message: 'Token no válido - usuario no existe en la base de datos',
            });
        }

        // Verificar si el usuario está activo
        if (user.deletedAt) {
            return res.status(401).json({
                message: 'Token no válido - usuario ya no existe.',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Token no válido',
        });
    }
};

module.exports = { isAuthenticated };