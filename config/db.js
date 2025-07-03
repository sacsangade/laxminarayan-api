const mongoose = require('mongoose');

console.log(process.env.DATABASE_URL);
const url = process.env.DATABASE_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

module.exports = conn;