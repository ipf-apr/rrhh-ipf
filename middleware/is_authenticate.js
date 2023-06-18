const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user");

const isAuthenticated = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            const jwtDecodificado = await promisify(jwt.verify)(
              req.cookies.jwt,
              process.env.JWT_SECRET
            );
        
            console.log(jwtDecodificado);
            
            await User.findOne({
              where: {
                id: jwtDecodificado.id,
              },
            })
              .then((user) => {
                if (!user) {
                  res.redirect("/login");
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
    } catch (error) {
        console.log('catch');
        console.log(error.message);
        res.redirect("/login");
    }
  };

  module.exports = {isAuthenticated};