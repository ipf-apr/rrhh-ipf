const { Router } = require('express')

const router = Router();

const authController = require('../controllers/auth.controllers');



router.get('/login', authController.loginPage)

router.get('/', authController.isAuthenticated,(req,res)=>{
    console.log(req.username);
    
    res.render('index')
})

router.get('/register', authController.isAuthenticated, (req,res)=>{
    res.render('auth/register')
})

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/logout',authController.logout);

module.exports = router;