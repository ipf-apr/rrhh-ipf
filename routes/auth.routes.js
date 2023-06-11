const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontrollers');

const conection = require('../database/db');
const res = require('express/lib/response');


router.get('/login', authController.loginPage)

router.get('/', authController.isAuthenticated,(req,res)=>{
    console.log(req.username.role);
    
    res.render('index')
})

router.get('/register', authController.isAuthenticated, (req,res)=>{
    res.render('auth/register')
})

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/logout',authController.logout);

module.exports = router;