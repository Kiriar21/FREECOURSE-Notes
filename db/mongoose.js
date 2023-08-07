const mongoose = require('mongoose');
const { database }  = require('../config')

mongoose.connect(database,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(result => {console.log("Connection")})
    .catch(err => {console.log(err)});

