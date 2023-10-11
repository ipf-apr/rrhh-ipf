const jwt = require("jsonwebtoken");
const environments = require("../config/environments");

const generateJWT = (payload) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, environments.JWT.JWT_SECRET, {
      expiresIn: environments.JWT.JWT_TIEMPO_EXPIRA,
    });
    if (token) {
      return resolve(token);
    }

    reject("Error al crear token;");
  });
};

module.exports = generateJWT;
