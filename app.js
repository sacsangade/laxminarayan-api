const express = require('express');
const multer = require('multer');
const cors = require('cors');
const Dotenv = require('dotenv');
Dotenv.config();
var path = require('path');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const conn = require('./config/db');
const routes = require('./routes/routes');


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public')); 
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());
app.use(routes);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})