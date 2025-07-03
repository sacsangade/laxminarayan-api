const mongoose = require('mongoose');

const url = process.env.DATABASE_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log("Server up and running!")
.catch((error) => console.log(error.message); 
mongoose.set('useFindAndModify', false);
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

module.exports = conn;