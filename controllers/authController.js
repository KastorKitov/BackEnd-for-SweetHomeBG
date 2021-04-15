const router = require('express').Router();
const authService = require('../services/authService');
router.post('/register',(req,res)=>{
    let [username,password,repeatPassword] = req.body;
    authService.register(username,password,repeatPassword)
    .then(result=>res.json(result))
    .catch(err=>console.log('something went wrong while registering!'))
})
router.post('/login',(req,res)=>{
    let [username,password]=req.body;
    authService.login(username,password)
    .then(object=>{
        if(object){
            res.header("Token",object.token).send(object.user)
        }else{
            res.send({error:'error'})
        }
    })
})
router.post('/auth',(req,res)=>{
    let token = req.body[0]
    authService.auth(token)
    .then(user=>res.json(user))
})

module.exports = router;