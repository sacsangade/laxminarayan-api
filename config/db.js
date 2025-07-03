const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

module.exports = conn;