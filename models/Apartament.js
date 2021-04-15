const mongoose = require('mongoose');
const apartamentSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        required:true,
    },
    rooms:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:false,
        maxLength:[400,'description too long!']
    },
    imageURL:{
        type:String,
        required:true,
    },
    owner: {
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
});

module.exports = mongoose.model('Apartament',apartamentSchema);