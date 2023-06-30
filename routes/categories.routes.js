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
} = require("../controllers/categories.controller");

const router = Router();

//Vistas
router.get("/categories", indexView);
router.get("/categories/:id/show", showView);
router.get("/categories/:id/edit", editView);
router.get("/categories/create", createView);

// API CRUD
router.get("/api/categories", index);
router.get("/api/categories/:id/show", show);
router.post("/api/categories", store);
router.put("/api/categories/:id/update", update);
router.delete("/api/categories/:id/destroy", destroy);

module.exports = router;
