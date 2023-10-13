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
      data: employee.Categories
    });
  } catch (error) {
    console.log(error)
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }

}

const update = (req, res) => {
  const { employeeId } = req.body;
}

const store = async (req, res) => {
  const { employeeId, categoryId } = req.params;
  const { datePromotion } = req.body;

  try {

    const employee = await Employee.findByPk(employeeId);
    const category = await Category.findByPk(categoryId);

    console.log(category);
  
    const categoryEmployee = await category.addEmployee(employee.id, { through: { datePromotion } })
    
    // await CategoryEmployee.create({
    //   employeeId, categoryId, datePromotion
    // })
    
    console.log('categoryEmployee');
    console.log(categoryEmployee);

    if (!categoryEmployee) {
      throw {
        status: 400,
        message: "No se pudo relacionar la categoría al empleado",
      };
    }
    return res.status(201).json({
      message: 'Categoría agregada al empleado correctamente'
    });
  } catch (error) {
    console.log(error);
  }


}

const destroy = (req, res) => {
  const { employeeId, categoryId } = req.params;
}



module.exports = {
  index,
  update,
  store,
  destroy,
};