const { Router } = require("express");
const upload= require("../helpers/multer");
const {
  indexView,
  showView,
  editView,
  createView,
  index,
  show,
  update,
  store,
  destroy,
} = require("../controllers/employees.controller");
const employeeSchema = require("../models/schemas/employee.schema");
const validateSchema = require("../middlewares/validations");
const imageEmploye = require('../controllers/employe.image.controllers')

const router = Router();

//Vistas
router.get("/employees", indexView);
router.get("/employees/:id/show", showView);
router.get("/employees/:id/edit", editView);
router.get("/employees/create", createView);

// API EMPLOYEE
router.get("/api/employees", index);
router.get("/api/employees/:id/show", show);
router.post('/api/employees/:id/image', upload.single('imageRoute'), imageEmploye);
router.post("/api/employees", validateSchema(employeeSchema),store);
router.put("/api/employees/:id/update", validateSchema(employeeSchema),  update);
router.delete("/api/employees/:id/destroy", destroy);



module.exports = router;
