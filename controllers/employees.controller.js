const { Employee } = require("../models/index");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const index = async (_req, res) => {
  await Employee.findAll()
    .then((employees) => {
      res.render("employees/index", { employees });
    })
    .catch((err) => {
      throw err;
    });
};

const show = async (req, res) => {
  const employeeId = req.params.id;

  await Employee.findByPk(employeeId)
    .then((employee) => {
      res.render("employees/show", { employee });
    })
    .catch((err) => {
      throw err;
    });
};

const create = (_req, res) => {
  let employee = Employee.build();
  res.render("employees/create", { employee });
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
    const [ employee, created] = await Employee.findOrCreate({
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
    
    res.render("employees/show", { employee : employee });
  } catch (error) {
    throw error;
  }
};

const edit = async (req, res) => {
  const employeeId = req.params.id;

  await Employee.findByPk(employeeId)
    .then((employee) => {
      res.render("employees/edit", { employee });
    })
    .catch((error) => {
      throw error;
    });
};

const update = async (req, res) => {
  const employeeId = req.params.id;
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
  try {
    const employee = await Employee.findByPk(employeeId);
    employee.update({
      lastName,
      name,
      dni,
      address: domicilio,
      dateBirthday: fechaNac,
      phone,
      profileNro: nroLegajo,
      dateIn: ingreso,
      promotion: 1,
    });
    res.render("employees/show", { employee });
  } catch (error) {
    throw error;
  }
};

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
