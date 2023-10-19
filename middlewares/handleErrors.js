const path = require('path')
const storeLogs = require('../helpers/storeLogs')


const handleErrors = (err, _req, res, next) => {
    
    console.log(err);
    const date = new Date();
    const timestamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    storeLogs(`${timestamp} - ${err.stack}\n`, path.dirname(__dirname), 'log-errors');
    const errorMessage = JSON.parse(err);
    res.status(errorMessage.status).send(errorMessage.Error);
};

module.exports = handleErrors;