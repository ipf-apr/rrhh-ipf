const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

//motor de platillas
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//seteo de carpeta public para archivos estaticos

app.use(express.static('public'));

//procesamiento de datos

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

//variables de entorno

dotenv.config({path:'./env/.env'})

//trabajar con las cookies

app.use(cookieParser());

//llamar al router
app.use('/', require('./routes/router'))

//eliminar la cache para que no se pueda volver atras
app.use(function(req,res,next){
    if(!req.username){
        res.header('Cache-Control','private, no-cache, no-store, must-revalidate');
        next();
    }
})


//poner el marcha el server
app.listen(3000, ()=>{
    console.log('server up http://localhost:3000') 
})