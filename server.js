const express = require('express');
const db = require('./config/mongoose');
const {PORT} = require('./config/config');
const router = require('./routes');
const app = express();
//const errorHandler = require('./middlewares/errorHandlerMiddleware');
require('./config/express')(app);

app.use(router);
//app.use(errorHandler); //next()

app.listen(PORT,()=>{console.log(`Server is listening on port: ${PORT}...`)});