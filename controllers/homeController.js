const router = require('express').Router();
const apartamentsService = require('../services/apartamentService');

    router.get('/',(req,res)=>{
        res.send('HELLO WORLD!')
    })

    router.get('/apartaments/all',(req,res)=>{
        apartamentsService.getAll()
        .then(apartaments=>{
            res.json(apartaments);
        })
    })

    router.get('/test',(req,res)=>{
        console.log('hello from server')
    })
// router.get('/',async(req,res)=>{
//     if(res.locals.user){
//     let user = await expensesService.getExpenses(req.user._id);
//     let userExpenses = await user.expenses;
//     res.render('home',{userExpenses}); 
//     }else{
//         res.render('homeGuest');
//     }
// });

// router.post('/refill',async(req,res)=>{
//     let userId = req.user._id;
//     if(!isNaN(req.body.refill)){
//         if(parseInt(req.body.refill)>0){
//             await expensesService.refill(userId,req.body.refill);
//         };
//     };
//     res.render('home');
// });

// router.get('/accountInfo/:userId',async(req,res)=>{
//     let user = await User.findById(req.params.userId).lean();
//     accountAmount = user.accountAmount;
//     let expensesAmount = await expensesService.getExpensesAmount(req.params.userId)
//     let amount = parseInt(accountAmount) - parseInt(expensesAmount);
//     let merch = user.expenses.length;
//     res.render('accountInfo',{accountAmount,merch,amount});
// })

module.exports = router;