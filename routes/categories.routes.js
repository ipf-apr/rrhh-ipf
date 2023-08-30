const { Router } = require("express");

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
router.post("/api/categories", store);
router.put("/api/categories/:id/update", update);
router.delete("/api/categories/:id/destroy", destroy);

module.exports = router;
