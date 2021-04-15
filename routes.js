const router = require('express').Router();

//controllers
const homeController = require('./controllers/homeController');
const apartamentsController = require('./controllers/apartamentsController');
const authController = require('./controllers/authController');
//const expensesController = require('./controllers/expensesController');

//use controllers
router.use('/',homeController);
router.use('/apartaments',apartamentsController);
router.use('/auth',authController)
//router.use('/auth',authController);
//router.use('/expenses',expensesController);
router.use('*',(req,res)=>{
    res.send('errorPage')
})

module.exports = router;