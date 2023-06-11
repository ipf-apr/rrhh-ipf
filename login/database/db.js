const mysql = require('mysql');

const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
})

conection.connect((error)=>{
    if(error){
        console.log('error en la conexion de la database'+error)
    }
    else{
        console.log('conexión a la database exitosa!')
    }
})

module.exports = conection