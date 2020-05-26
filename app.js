const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

//app.use(express.urlencoded())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Data Base Connection
mongoose.connect("mongodb://172.17.0.1:27017/tuwamif", {
    useNewUrlParser: true,
    useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});

mongoose.connection.on('error', (err) => {

    console.log(err.name);
});

//acces-control-origin-header
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "*")
    next();
});

//public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes imports
var indexRoute = require('./routes/routes.js');

// Routes registration
app.use('/api', indexRoute);

// Local connection
var x = app.listen(3000, () => {
    console.log(x.address())
});
