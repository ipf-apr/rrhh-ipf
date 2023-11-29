const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const environments = require('../config/environments')


const Employee = require("../models/employee");
const Category = require("../models/category");
const Skill = require("../models/skill");

const CategoryEmployee = require("../models/categoryEmployee");
const JobPosition = require("../models/jobPosition");
const EmployeeJobPosition = require("../models/employeeJobPosition");

//VISTAS
const indexView = (_req, res) => {
  res.render("employees/index");
};

const showView = (req, res) => {
  const employeeId = req.params.id;
  res.render("employees/show", { id: employeeId });
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
  const { lastName, name, promotion, position, category, skill } = req.query;

  let whereClausule = {};
  let whereCategoryClausule = {};

  if (Object.keys(req.query).length !== 0) {

    if (lastName) {
      whereClausule.lastName = {
        [Op.like]: `%${lastName}%`
      }
    }
    if (name) {
      whereClausule.name = {
        [Op.like]: `%${name}%`
      }
    }
    if (promotion) {
      whereClausule.promotion = promotion
    }
    // if (position) {
    //   whereClausule["$jobPositions.id$"] = position
    // }
    // if (category) {
    //   whereCategoryClausule.id = category
    // }
    if (skill) {
      whereClausule["$employeeSkills.id$"] = skill
    }

  };

  console.log(whereClausule)

  try {
    const employees = await Employee.findAll({
      where: whereClausule,
      include: [{
        model: Category,
      }, JobPosition, 'employeeSkills'],
      order: [[Category, CategoryEmployee, "datePromotion", "DESC"], [JobPosition, EmployeeJobPosition, "id", "DESC"]],

    });

    if (category && position) {
      const newEmployees = employees.filter(employee => {
        return employee.Categories[0]?.id == category && employee.JobPositions[0]?.id == position
      })
      return res.json(newEmployees);
    }

    if (category || position) {
      const newEmployees = employees.filter(employee => {
        return employee.Categories[0]?.id == category
      })
      return res.json(newEmployees);
    }

    if (position) {
      const newEmployees = employees.filter(employee => {
        return employee.JobPositions[0]?.id == position
      })
      return res.json(newEmployees);
    }



    return res.json(employees);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
};

const show = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findByPk(employeeId, {
      include: [Category, JobPosition],
      order: [[Category, CategoryEmployee, "datePromotion", "DESC"]],
    });

    if (!employee) {
      throw {
        status: 404,
        message: "No existe el empleado con el id " + employeeId,
      };
    }

    return res.json(employee);
  } catch (error) {
    console.log(error)
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
    dateBirthday,
    phone,
    profileNro,
    dateIn,
  } = req.body;

  const token = req.cookies.jwt || req.header("Authorization")

  const jwtDecodificado = await promisify(jwt.verify)(
    token,
    environments.JWT.JWT_SECRET
  );

  try {
    const [employee, created] = await Employee.findOrCreate({
      where: { dni: dni },
      defaults: {
        lastName,
        name,
        address: domicilio,
        dateBirthday,
        phone,
        profileNro,
        dateIn,
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
    promotion,
  } = req.body;
  try {
    const employee = await Employee.findByPk(employeeId, {
      include: [Category],
      order: [[Category, CategoryEmployee, "datePromotion", "DESC"]],
    });
    employee.update({
      lastName,
      name,
      dateBirthday,
      address,
      dni,
      phone,
      profileNro,
      dateIn,
      promotion,
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
        id: employeeId,
      },
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
