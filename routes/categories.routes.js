const { Router } = require("express");
const categorySchema = require("../models/schemas/category.schema");
const validateSchema = require("../middlewares/validations");

const {
  indexView, 
  index,
  show,
  update,
  store,
  destroy,
} = require("../controllers/categories.controller");
const { isAdmin } = require("../middlewares/is_admin");

const router = Router();

//Vistas
router.get("/categories", indexView);


// API CRUD
router.get("/api/categories", index);
router.get("/api/categories/:id/show", show);
router.post("/api/categories", validateSchema(categorySchema), store);
router.put("/api/categories/:id/update", validateSchema(categorySchema), update);
router.delete("/api/categories/:id/destroy", isAdmin, destroy);

module.exports = router;
