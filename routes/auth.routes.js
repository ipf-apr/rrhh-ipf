const { Router } = require('express')

const router = Router();

const authController = require('../controllers/auth.controllers');

const registerSchema = require('../models/schemas/auth.register.schema');
const validateSchema = require('../middleware/validations');
const loginSchema = require('../models/schemas/auth.login.schema');



router.get('/login', authController.loginPage)

router.post('/api/register', registerSchema, validateSchema, authController.register);


router.post('/api/login', loginSchema, validateSchema, authController.login);
router.post('/logout',authController.logout);

module.exports = router;