const mongoose = require('mongoose');
const {databasemongo} = require('./keys');

mongoose.connect(databasemongo.uri,{
    userCreateIndex : true,
    userNewUrlParser: true,
    useFindAndModify : false,
    
}).then(db=>console.log('Db is connected')).catch(err => console.errror(err));