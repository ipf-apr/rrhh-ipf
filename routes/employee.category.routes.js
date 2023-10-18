const { Router } = require("express");

const {
  index,
  update,
  store,
  destroy,
} = require("../controllers/employee.category.controller");
const employeeCategorySchema = require("../models/schemas/categoryEmployee.schema");
const validateSchema = require("../middleware/validations");

const router = Router();

// API EMPLOYEE CATEGORY
router.get("/employees/:employeeId/categories", index);
router.post("/employees/:employeeId/categories/:categoryId/store", validateSchema(employeeCategorySchema),  store);
router.put("/employees/:employeeId/categories/:categoryId/update", validateSchema(employeeCategorySchema),  update);
router.delete("/employees/:employeeId/categories", destroy);



module.exports = router;
