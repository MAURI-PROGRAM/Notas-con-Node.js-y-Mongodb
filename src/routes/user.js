const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/user/signin',(req,res)=>{
    res.render('user/signin');
});
router.post('/user/signin',passport.authenticate('local',{
    successRedirect : '/notes',
    failureRedirect : '/user/signin',
    failureFlash : true
}));
router.get('/user/signup',(req,res)=>{
    res.render('user/signup');
});
router.post('/user/signup',async (req,res)=>{
    const {name,email,password,confirm_password}=req.body;
    const errors = [];
    if(password != confirm_password){
        errors.push({text:'Password,Confirm_password not match'});
    }
    if(password.length < 4 ){
        errors.push({text:'Password debe ser mayor a 4 caracteres'});
    }
    if(errors.length>0){
        res.render('user/signup',{errors,name,email,password,confirm_password});
    }
    else{
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_ms','El correo ya esta registrado');
            res.redirect('/user/signup');
        }
        else{
        const newUser = new User({name,email,password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_ms','Estas registrado');
        res.redirect('/user/signin');
        }
        
    }
});
router.get('/user/logout',(req,res)=>{
    res.send('LogOut');
});


module.exports = router;