const path = require('path')
const storeLogs = require('../helpers/storeLogs')

//function to handle errors in the app
const handleErrors = (err, _req, res, next) => {

    const date = new Date();
    const timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    storeLogs(`${timestamp} - ${err.stack}\n`, path.dirname(__dirname), 'logs/errors');
    const errorMessage = JSON.parse(err);
    res.status(errorMessage.status).send(errorMessage.Error || errorMessage.error);
};

module.exports = handleErrors;