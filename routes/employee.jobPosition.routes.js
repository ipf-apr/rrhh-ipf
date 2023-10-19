const { Router } = require("express");

const {
  index,
  update,
  store,
  destroy,
} = require("../controllers/employee.jobPosition.controller");
const employeeJobPosition = require("../models/schemas/employeeJobPosition.schema");
const validateSchema = require("../middleware/validations");

const router = Router();

// API EMPLOYEE CATEGORY
router.get("/employees/:employeeId/jobPositions", index);
router.post("/employees/:employeeId/jobPositions/:jobPositionId/store", validateSchema(employeeJobPosition),  store);
router.put("/employees/:employeeId/jobPositions/:jobPositionId/update", validateSchema(employeeJobPosition),  update);
router.delete("/employees/:employeeId/jobPositions/:jobPositionId/destroy", destroy);



module.exports = router;
