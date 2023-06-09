const { Router } = require("express");

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

const router = Router();

//Vistas
router.get("/employees", indexView);
router.get("/employees/:id/show", showView);
router.get("/employees/:id/edit", editView);
router.get("/employees/create", createView);

// API CRUD
router.get("/api/employees", index);
router.get("/api/employees/:id/show", show);
router.post("/api/employees", store);
router.put("/api/employees/:id/update", update);
router.delete("/api/employees/:id/destroy", destroy);

module.exports = router;
