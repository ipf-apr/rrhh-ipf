const { Router } = require("express");

const router = Router();

const authController = require("../controllers/auth.controller");

const registerSchema = require("../models/schemas/auth.register.schema");
const validateSchema = require("../middleware/validations");
const loginSchema = require("../models/schemas/auth.login.schema");

router.get("/login", authController.loginPage);

router.post(
  "/api/register",
  validateSchema(registerSchema),
  authController.register
);

router.post("/api/login", validateSchema(loginSchema), authController.login);
router.post("/logout", authController.logout);

module.exports = router;
