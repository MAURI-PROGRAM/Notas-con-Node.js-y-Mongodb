const express = require('express');
const router = express.Router();


router.get('/user/signin',(req,res)=>{
    res.send('SignIn');
});
router.get('/user/signup',(req,res)=>{
    res.send('SignUp');
});
router.get('/user/logout',(req,res)=>{
    res.send('LogOut');
});


module.exports = router;