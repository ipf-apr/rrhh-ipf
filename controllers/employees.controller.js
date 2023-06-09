const Employee = require("../models/employee");
const User = require("../models/user");
const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//VISTAS
const indexView = (_req, res) => {
  res.render("employees/index");
};

const showView = (req, res) => {
  const employeeId = req.params.id;
  res.render('employees/show', { id: employeeId });
};

const createView = (_req, res) => {
  res.render("employees/create");
};

const editView = (req, res) => {
  const employeeId = req.params.id;
  res.render("employees/edit", { id: employeeId });
};

//APIS
const index = async (req, res) => {

  const { lastName, name} = req.query;

  try {
    const employees = await Employee.findAll({
      where:{
        lastName:{
          [Op.like] : `%${lastName}%`
        }, 
        name: {
          [Op.like] : `%${name}%`
        }
      }
    });
    
    if (!employees || employees.length === 0) {
      throw {
        status: 404,
        message: "No hay empleados registrados aún.",
      };
    }
    return res.json(employees);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
};

const show = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findByPk(employeeId,{
      include: User
    });

    if (!employee) {
      throw {
        status: 404,
        message: "No existe el empleado con el id " + employeeId,
      };
    }

    return res.json(employee);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};


const store = async (req, res) => {
  const {
    lastName,
    name,
    dni,
    domicilio,
    fechaNac,
    phone,
    nroLegajo,
    ingreso,
  } = req.body;

  const jwtDecodificado = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRET
  );

  try {
    const [employee, created] = await Employee.findOrCreate({
      where: { dni: dni },
      defaults: {
        lastName,
        name,
        address: domicilio,
        dateBirthday: fechaNac,
        phone,
        profileNro: nroLegajo,
        dateIn: ingreso,
        promotion: 1,
        userId: jwtDecodificado.id,
      },
    });

    if (!employee) {
      throw {
        status: 400,
        message: "No se pudo crear el empleado.",
      };
    }

    return res.json(employee);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const update = async (req, res) => {
  const employeeId = req.params.id;
  const {
    address,
    dateBirthday,
    dateIn,
    dni,
    lastName,
    name,
    phone,
    profileNro,
    promotion
  } = req.body;
  try {
    const employee = await Employee.findByPk(employeeId);
    employee.update({
      lastName,
      name,
      dateBirthday,
      address,
      dni,
      phone,
      profileNro,
      dateIn,
      promotion
    });
    return res.json(employee);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const destroy = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await Employee.destroy({
      where: {
        id: employeeId
      }
    });
    return res.json({ employee, message: "Empleado eliminado correctamente." });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

module.exports = {
  indexView,
  index,
  showView,
  show,
  editView,
  update,
  createView,
  store,
  destroy,
};
