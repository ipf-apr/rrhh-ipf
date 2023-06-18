const { Router } = require('express')

const router = Router();

const authController = require('../controllers/auth.controllers');
const { isAuthenticated } = require('../middleware/is_authenticate');



router.get('/login', authController.loginPage)

router.get('/', isAuthenticated, authController.index)

router.get('/register', isAuthenticated, authController.registerForm)

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/logout',authController.logout);

module.exports = router;