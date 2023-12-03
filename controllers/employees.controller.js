const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const environments = require("../config/environments");

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
  const { lastName, name, dni, gender, promotion, selectedJobPosition, selectedCategory, selectedSkill } =
    req.query;

  let whereClausule = {};

  if (Object.keys(req.query).length !== 0) {
    if (lastName) {
      whereClausule.lastName = {
        [Op.like]: `%${lastName}%`,
      };
    }
    if (name) {
      whereClausule.name = {
        [Op.like]: `%${name}%`,
      };
    }
    if (dni) {
      whereClausule.dni = {
        [Op.like]: `%${dni}%`,
      };
    }
    if (promotion) {
      whereClausule.promotion = promotion;
    }
    if (gender) {
      whereClausule.gender = gender;
    }
    if (selectedSkill) {
      whereClausule["$employeeSkills.id$"] = selectedSkill;
    }
  }

  console.log(whereClausule);

  try {
    const employees = await Employee.findAll({
      where: whereClausule,
      include: [Category, JobPosition, "employeeSkills"],
      order: [
        [Category, CategoryEmployee, "datePromotion", "DESC"],
        [JobPosition, EmployeeJobPosition, "id", "DESC"],
      ],
    });

    if (selectedCategory && selectedJobPosition) {
      const newEmployees = employees.filter((employee) => {
        return (
          employee.Categories[0]?.id == selectedCategory &&
          employee.JobPositions[0]?.id == selectedJobPosition
        );
      });
      return res.json(newEmployees);
    }

    if (selectedCategory) {
      const newEmployees = employees.filter((employee) => {
        return employee.Categories[0]?.id == selectedCategory;
      });
      return res.json(newEmployees);
    }

    if (selectedJobPosition) {
      const newEmployees = employees.filter((employee) => {
        return employee.JobPositions[0]?.id == selectedJobPosition;
      });
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
    console.log(error);
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
    gender,
    domicilio,
    dateBirthday,
    phone,
    profileNro,
    dateIn,
  } = req.body;

  const token = req.cookies.jwt || req.header("Authorization");

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
        gender,
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

    if (!created) {
      throw {
        status: 400,
        message: "Ya existe un empleado con el dni " + dni,
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
    gender,
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
      gender,
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
