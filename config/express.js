const express = require('express');
//const authMidlleware = require('../middlewares/auth');
const cors = require('cors');
module.exports = function(app){

    //app.use(express.static('public'));
    
    app.use(express.json()); //parse на формите.
    app.use(cors({exposedHeaders:'Token'}));
    //app.use(authMidlleware);
};