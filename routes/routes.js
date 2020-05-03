const express = require('express');
const router = express.Router();
var pdfFillForm = require('pdf-fill-form');
var nodemailer = require('nodemailer');

router.get('/home', function (req, res) {

    res.status(200).send('succesfully working')
});

router.post('/submit_form', function (req, res) {

    console.log(req.body)

    var data = req.body;

    // pdfFillForm.write('./contracts/test.pdf', data, {
    //         "save": "pdf",
    //         'cores': 4,
    //         'scale': 0.2,
    //         'antialias': true
    //     })
    //     .then(function (result) {
    //         fs.writeFile("test123.pdf", result, function (err) {
    //             if (err) {
    //                 return console.log(err);
    //             }
    //             console.log("The file was saved!");
    //         });
    //     }, function (err) {
    //         console.log(err);
    //     });


})

module.exports = router;