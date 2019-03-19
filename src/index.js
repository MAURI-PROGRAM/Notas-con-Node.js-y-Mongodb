const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//inicializacion
const app = express();
require('./databse');
require('./config/passport');

//Settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
  }));
app.set('view engine','.hbs');


//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'mysecreatapp',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global Variable
app.use((req,res,next)=>{
    res.locals.success_ms=req.flash('success_ms');
    res.locals.error_ms=req.flash('error_ms');
    res.locals.error=req.flash('error');
    next();
});

//Routs
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/user'));
//static file
app.use(express.static(path.join(__dirname,'public')));
//server is listenning
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
})