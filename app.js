const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const environments = require('./config/environments')
const storeLog = require('./helpers/storeLogs')
const fs = require('fs')
const handleErrors = require("./middlewares/handleErrors");
const createFirstUser = require('./helpers/createFirstUser');
const { createServer } = require('http'); 
const socketIO = require('socket.io');

// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
const { sequelize } = require('./config/database');

const app = express();
const httpServer = createServer(app);
const io = socketIO(httpServer);

//configuración del motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//configuracion de socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');
//Evento del cliente
socket.on('login',(userData)=>{
  console.log(`Usuario ${userData.username} se ha conectado`);
});
//desconexión del cliente
socket.on('disconnect',()=>{
  console.log('Usuario desconectado');
});
});




//Carpeta public para archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//procesamiento de datos

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy : false
  })
);
app.use(morgan("combined", {
  stream: {
    write: (message) => {
      storeLog(message, __dirname, 'logs')
    }
  }
}));
//Si la carpeta uploads no existe, se crea
if (!fs.existsSync(__dirname + "/public/uploads")) {
  fs.mkdirSync(__dirname + "/public/uploads");
}


//trabajar con las cookies
app.use(cookieParser());

// Se ejecuta una instancia de conexión a la base de datos
require('./models/associations')
sequelize.sync({force : false})
.then(() => { 
  console.log('Conexión a base de datos exitosa');
  createFirstUser();
})
.catch((error) => console.log('Error al conectar a base de datos', error));
  

const { isAuthenticated } = require('./middlewares/is_authenticate');

app.use("/", require("./routes/auth.routes"));
app.use("/", isAuthenticated,  require("./routes/dashboard.routes"));
app.use("/", isAuthenticated,   require("./routes/employees.routes"));
app.use("/api", isAuthenticated,   require("./routes/employee.category.routes"));
app.use("/api", isAuthenticated,   require("./routes/employee.jobPosition.routes"));
app.use("/", isAuthenticated,   require("./routes/users.routes"));
app.use("/", isAuthenticated,  require("./routes/categories.routes"));
app.use('/', isAuthenticated, require('./routes/skills.routes'))
app.use('/', isAuthenticated, require('./routes/jobPositions.routes'));
app.use('/', isAuthenticated, require('./routes/employee.skills.routes'));
//eliminar la cache para que no se pueda volver atrás
app.use(function (req, res, next) {
  if (!req.username) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    next();
  }
  
  res.status(404).render("errors/404.ejs");
});
// TODO: implementar en rutas.
app.use(handleErrors)

//poner el marcha el server
httpServer.listen(environments.APP_PORT, () => {
  console.log(`Servidor en ${environments.APP_URL}:${environments.APP_PORT}`);
});
