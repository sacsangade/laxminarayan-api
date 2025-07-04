const mongoose = require('mongoose');

const url = process.env.DATABASE_URL;
mongoose.connect(url);
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

module.exports = conn;