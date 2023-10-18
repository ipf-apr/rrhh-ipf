const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const environments = require('./config/environments')


// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
const { sequelize } = require('./config/database');

const app = express();


//configuración del motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
app.use(morgan("dev"));



//trabajar con las cookies
app.use(cookieParser());

// Se ejecuta una instancia de conexión a la base de datos
sequelize.authenticate()
  .then(() => { 
    console.log('Conexión a base de datos exitosa');
 })
  .catch((error) => console.log('Error al conectar a base de datos', error));


const { isAuthenticated } = require('./middleware/is_authenticate');

app.use("/", require("./routes/auth.routes"));
app.use("/", isAuthenticated,  require("./routes/dashboard.routes"));
app.use("/", isAuthenticated,   require("./routes/employees.routes"));
app.use("/api", isAuthenticated,   require("./routes/employee.category.routes"));
app.use("/api", isAuthenticated,   require("./routes/employee.jobPosition.routes"));
app.use("/", isAuthenticated,   require("./routes/users.routes"));
app.use("/", isAuthenticated,  require("./routes/categories.routes"));
app.use('/', isAuthenticated, require('./routes/skills.routes'))
app.use('/', isAuthenticated, require('./routes/jobPositions.routes'))
//eliminar la cache para que no se pueda volver atras
app.use(function (req, res, next) {
  if (!req.username) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    next();
  }

  res.status(404).render("errors/404.ejs");
});

//poner el marcha el server
app.listen(environments.APP_PORT, () => {
  console.log(`Servidor en ${environments.APP_URL}:${environments.APP_PORT}`);
});
