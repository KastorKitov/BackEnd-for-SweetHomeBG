const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:4
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    liked:[{
        type:mongoose.Types.ObjectId,
        ref:'Apartament'
    }],
});

module.exports = mongoose.model('User',userSchema);