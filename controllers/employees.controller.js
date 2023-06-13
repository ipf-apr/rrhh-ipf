const { Employee } = require("../models/index");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const index = (_req, res) => {
  try {
    Employee.findAll().then((employees) => {
      res.render("employees/index", { employees });
    });
  } catch (error) {
    throw error;
  }
};

const show = async (req, res) => {
  const employeeId = req.params.id;

  await Employee.findByPk(employeeId)
    .then((employee) => {
      res.render("employees/show", { employee });
    })
    .catch((err) => {});
};

const create = (_req, res) => {
  res.render("employees/create", { Employee });
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

  Employee.create({
    lastName,
    name,
    dni,
    address: domicilio,
    dateBirthday: fechaNac,
    phone,
    profileNro: nroLegajo,
    dateIn: ingreso,
    promotion: 1,
    userId: jwtDecodificado.id,
  })
    .then((employee) => {
      res.render("employees/show", { employee });
    })
    .catch((error) => {
      throw error;
    });
};

const edit = (_req, res) => {
  
};

const update = (req, res) => {};

const destroy = (req, res) => {};

module.exports = {
  index,
  show,
  edit,
  update,
  create,
  store,
  destroy,
};
