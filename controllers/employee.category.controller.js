const { sequelize } = require("../config/database");
const Category = require("../models/category");
const CategoryEmployee = require("../models/categoryEmployee");
const Employee = require("../models/employee");

const index = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await Employee.findByPk(employeeId, {
      include: [Category],
      order: [[Category, CategoryEmployee, "datePromotion", "DESC"]],
    });

    if (!employee) {
      throw {
        status: 404,
        message: "No existe el empleado con el id " + employeeId,
      };
    }

    return res.json({
      data: employee.Categories,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

const update = (req, res) => {
  const { employeeId, categoryId } = req.params;
  //TODO

};

const store = async (req, res) => {
  const { employeeId, categoryId } = req.params;
  const { datePromotion } = req.body;

  try {
    
    let categoryEmployee = await CategoryEmployee.findOne({
      where: {
        employeeId,
        categoryId,
        datePromotion,
      },
    });   
    
    
    if (categoryEmployee?.employeeId === +employeeId) {

      return res.status(200).json({
        message: "La categoría ya estaba agregada a este empleado.",
      });

    } else {      
      categoryEmployee = await sequelize.query(
        `INSERT INTO category_employee (employee_id,category_id,date_promotion) VALUES (${employeeId},${categoryId},'${datePromotion}');`
      );
    }

    if (!categoryEmployee) {
      throw {
        status: 400,
        message: "No se pudo relacionar la categoría al empleado",
      };
    }

    return res.status(201).json({
      message: "Categoría agregada al empleado correctamente",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message:
        error.message || "Error desconocido, consulte con el administrador.",
    });
  }
};

const destroy = (req, res) => {
  const { employeeId, categoryId } = req.params;
  //TODO
};

module.exports = {
  index,
  update,
  store,
  destroy,
};
