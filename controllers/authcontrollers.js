const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conection = require('../database/db');
const { promisify } = require('util');
const { error } = require('console');

//procedimiento de registro

exports.register = async (req, res) => {
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
                return res.render('auth/login', {
                    alert: true,
                    alertTitle: "Advertencia",
                    alertMessage: "Ingrese un usuario y contraseña",
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login',
                    existUser: false
                })
            }
        }


        if (pass !== passConfirmation) {
            if (fu) {
                return res.render('auth/login', {
                    alert: true,
                    alertTitle: "Advertencia",
                    alertMessage: "Las contraseñas no coinciden",
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login',
                    existUser: false
                })
            }
        }



        let passHash = await bcryptjs.hash(pass, 8);

        console.log(passHash.length);
        // console.log(passHash);
        conection.query('INSERT INTO users SET ?', { name: name, last_name: lastName, username: username, password: passHash, role: rol }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/login')
            }
        })
    } catch (error) {
        console.log(error);
    }
}


exports.login = async (req, res) => {
    try {
        const username = req.body.username;
        const pass = req.body.password;
        if (!username || !pass) {
            res.render('auth/login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y contraseña",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        } else {
            conection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
                if (results == 0 || !(await bcryptjs.compare(pass, results[0].password))) {
                    res.render('auth/login', {
                        alert: true,
                        alertTitle: "Advertencia",
                        alertMessage: "Usuario y/o Contraseña Incorrecto/s!",
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login',
                        existUser: true
                    })
                } else {
                    const id = results[0].id;
                    const role = results[0].role;
                    const token = jwt.sign({ id: id, rol: role }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions);
                    res.render('auth/login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "login correcto",
                        alertIcon: 'succes',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: '',
                        existUser: true
                    })
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}



exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const jwtDecodificado = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
            conection.query('SELECT * FROM users WHERE id = ?', [jwtDecodificado.id], (error, results) => {
                if (!results) { return next() }
                req.username = results[0];
                return next();
            })
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        res.redirect('/login');
    }
}

exports.loginPage = async (req, res) => {
    try {
        conection.query('SELECT id FROM users limit 1', (error, results) => {
            if (results.length === 0) {
                res.render('auth/login', { alert: false, existUser: false })
            } else {
                res.render('auth/login', { alert: false, existUser: true })
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/');
}
