// Se importan las clases de la librería
const { Sequelize, Model, DataTypes } = require('sequelize');
const environments = require('./environments')

// Se crea una instancia de la conexión a la base de datos
const sequelize = new Sequelize(
    environments.DB.DB_DATABASE,
    environments.DB.DB_USER,
    environments.DB.DB_PASSWORD,
    {
        host: environments.DB.DB_HOST,
        dialect: environments.DB.DB_DIALECT, // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
        timezone: environments.DB.UTC
    });

// Se exportan la conexión a MySQL, Model y DataTypes para poder usarlas en los modelos
module.exports = {
    sequelize,
    DataTypes,
    Model
}