const express = require('express');
const router = express.Router();


router.get('/user/signin',(req,res)=>{
    res.render('user/signin');
});
router.get('/user/signup',(req,res)=>{
    res.render('user/signup');
});
router.get('/user/logout',(req,res)=>{
    res.send('LogOut');
});


module.exports = router;