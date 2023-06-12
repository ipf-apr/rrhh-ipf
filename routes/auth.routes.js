const { Router } = require('express')

const router = Router();

const authController = require('../controllers/auth.controllers');



router.get('/login', authController.loginPage)

router.get('/', authController.isAuthenticated, authController.index)

router.get('/register', authController.isAuthenticated, authController.registerForm)

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/logout',authController.logout);

module.exports = router;