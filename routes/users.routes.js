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
} = require("../controllers/users.controller");

const validateSchema = require("../middleware/validations");
const userSchema = require("../models/schemas/user.schema");

const router = Router();

// Vistas
router.get("/users", indexView);
router.get("/users/create", createView);
router.get("/users/:id/show", showView);
router.get("/users/:id/edit", editView);

// API
router.get("/api/users", index);
router.post("/api/users", validateSchema(userSchema), store);
router.get("/api/users/:id/show", show);
router.put("/api/users/:id/update", validateSchema(userSchema), update);
router.delete("/api/users/:id/destroy", destroy);

module.exports = router;
