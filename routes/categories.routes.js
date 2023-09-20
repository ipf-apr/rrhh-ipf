const { Router } = require("express");
const categorySchema = require("../models/schemas/category.schema");
const validateSchema = require("../middleware/validations");

const {
  indexView, 
  index,
  show,
  update,
  store,
  destroy,
} = require("../controllers/categories.controller");

const router = Router();

//Vistas
router.get("/categories", indexView);

// API CRUD
router.get("/api/categories", index);
router.get("/api/categories/:id/show", show);
router.post("/api/categories", categorySchema, validateSchema, store);
router.put("/api/categories/:id/update", categorySchema, validateSchema, update);
router.delete("/api/categories/:id/destroy", destroy);

module.exports = router;
