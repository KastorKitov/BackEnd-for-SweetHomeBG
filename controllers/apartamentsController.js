const router = require('express').Router();
const apartamentServices = require('../services/apartamentService');

router.post('/sell',(req,res)=>{
    let [name,rooms,city,price,imageURL,description,owner] = req.body;
    apartamentServices.sellApartament(name,rooms,city,price,imageURL,description,owner)
    .then(resp=>res.json('created'))
    .catch('cannot get input from sell an apartament!')
});

router.post('/search',(req,res)=>{
    let [name,rooms,city,priceFrom,priceTo] = req.body;
    apartamentServices.getFromSearch(name,rooms,city,priceFrom,priceTo)
    .then(apartaments=>res.json(apartaments));

})

router.post('/one',async(req,res)=>{
    let [id]=req.body;
    apartamentServices.getOne(id)
    .then(apartament=>{
        res.json(apartament)})
})

router.get('/id/:id',(req,res)=>{
    apartamentServices.getByUserId(req.params.id)
    .then(apartaments=>res.json(apartaments))
    .catch(err=>console.log('cannot get apartaments!'));
    console.log(req.params.id)
})

router.post('/liked',(req,res)=>{
    let [userId,apartamentId] = req.body;
     apartamentServices.likeOne(userId,apartamentId)
     .then(user=>res.json(user))
})

router.get('/liked/:id',(req,res)=>{
    apartamentServices.getApartamentByUserId(req.params.id)
     .then(result=>{
         console.log(result)
        res.json(result)})
})

router.post('/unLiked',(req,res)=>{
    let [userId,apartamentId] = req.body;
     apartamentServices.unLikeOne(userId,apartamentId)
     .then(user=>res.json(user))
})

router.post('/delete',(req,res)=>{
    let id = req.body[0]
    apartamentServices.deleting(id).then()
})

router.post('/edit',(req,res)=>{
    let id = req.body;
    apartamentServices.editOn(id)
    .then(edited=>res.json(edited))
})

router.post('/editing',(req,res)=>{
    let [name,rooms,city,price,imageURL,description,houseId] = req.body;
    apartamentServices.editOne(name,rooms,city,price,imageURL,description,houseId)
    .then(console.log('edited!'))
})

module.exports = router;