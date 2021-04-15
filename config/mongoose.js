const {DB_URI} = require('./config');
const mongoose = require('mongoose');

mongoose.connect(DB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex:true,
useFindAndModify:false
});

const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('DB is connected!')
});

module.exports = db;