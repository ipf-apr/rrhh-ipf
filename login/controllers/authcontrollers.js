const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conection = require('../database/db');
const {promisify} = require('util');
const { error } = require('console');

//procedimiento de registro

exports.register = async(req,res)=>{
    try {
        const firsName = req.body.firsName;
        const lastName = req.body.lastName;
        const user = req.body.user;
        const pass = req.body.pass;
        let passHash = await bcryptjs.hash(pass,8);
        // console.log(passHash);
        conection.query('INSERT INTO users SET ?',{firsName:firsName, lastName:lastName, user:user, pass:passHash}, (error,results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/login')
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.login = async(req,res)=>{
    try {
        const username = req.body.username;
        const pass = req.body.pass;
        // console.log(username ,'-',pass);
        if(!username || !pass){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y contraseña",
                alertIcon:'info',
                showConfirmButton: true,
                timer:false,
                ruta:'login'
            })
        }else{
                conection.query('SELECT * FROM users WHERE user = ?',[username], async (error,results)=>{
                if(results == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login',{
                        alert:true,
                        alertTitle: "Advertencia",
                        alertMessage: "Usuario y/o Contraseña Incorrecto/s!",
                        alertIcon:'info',
                        showConfirmButton: true,
                        timer:false,
                        ruta:'login'
                    })
                }else{
                    const id = results[0].id;
                    const token = jwt.sign({id:id}, process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    const cookiesOptions = {
                        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60* 60 *1000),
                        httpOnly:true
                    }
                    res.cookie('jwt',token,cookiesOptions);
                    res.render('login',{
                        alert:true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "login correcto",
                        alertIcon:'succes',
                        showConfirmButton: false,
                        timer:800,
                        ruta:''
                    })
                }
            })
            }
    } catch (error) {
        console.log(error);
    }
}

exports.isAuthenticated = async (req,res,next)=>{
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
            conection.query('SELECT * FROM users WHERE id = ?',[decodificada.id],(error,results)=>{
                if(!results){return next()}
                req.username = results[0];
                return next();
            })
        } catch (error) {
            console.log(error);
            return next();
        }
    }else{
        res.redirect('/login');
    }
}

exports.logout = (req,res)=>{
    res.clearCookie('jwt');
    return res.redirect('/');
}