const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const mongooseValidationErrorTransform = require('mongoose-validation-error-transform');

//app.use(express.urlencoded())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Data Base Connection
// mongoose.connect("mongodb://192.168.0.100:27017/tuwamif", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });


mongoose.connect("mongodb+srv://Joseph:PqLr29pmJHCxJru@cluster0-bzlr9.mongodb.net/tuwamif?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
    console.log('Database connected');
});

mongoose.connection.on('error', (err) => {
    console.log("DATABASE CONNECTION ERROR")
    console.log(err.name);
});

//Mongoose Validation error formating
mongoose.plugin(mongooseValidationErrorTransform, {

    //
    // these are the default options you can override
    // (you don't need to specify this object otherwise)
    //

    // should we capitalize the first letter of the message?
    capitalize: true,

    // should we convert `full_name` => `Full name`?
    humanize: true,

    // how should we join together multiple validation errors?
    transform: function (messages) {
        return messages.join(',   ');
    }
    // transform: function (messages) {
    //     if (messages.length === 1) return messages[0];
    //     return `<ul><li>${messages.join('</li><li>')}</li></ul>`;
    // }

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
