const mysql = require('mysql');

const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
})

conection.connect((error)=>{
    if(error){
        console.log('Se produjo un error al conectarse a la BD: '+error)
    }
    else{
        console.log('Se conectó a la base de datos de manera exitosa.')
    }
})

module.exports = conection