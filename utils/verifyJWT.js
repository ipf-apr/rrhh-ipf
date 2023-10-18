const jwt = require("jsonwebtoken");
const environments = require("../config/environments");

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, environments.JWT.JWT_SECRET, function (error, decoded) {
        if (error) {
            reject(error)
        }
        resolve(decoded);
    })
  });
};

module.exports = verifyJWT;
