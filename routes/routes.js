const express = require('express');
const router = express.Router();
var pdfFillForm = require('pdf-fill-form');
var nodemailer = require('nodemailer');

router.get('/home', function (req, res) {

    res.status(200).send('succesfully working')
});

router.post('/submit_form', function (req, res) {

    console.log(req.body)
    console.log(req.body.name)
    var data = req.body;

    // pdfFillForm.write('./contracts/contract.pdf', data, {
    //         "save": "pdf",
    //         'cores': 4,
    //         'scale': 0.2,
    //         'antialias': true
    //     })
    //     .then(function (result) {
    //         fs.writeFile("ready.pdf", result, function (err) {
    //             if (err) {
    //                 return console.log(err);
    //             }
    //             console.log("The file was saved!");

    //             var receiver = 'josephmichaeltest@gmail.com'
    //             var name = 'Joseph miachel'
    //             var message = `<h2>CONTRACT FORM SUBMISSION</h2>`


    //             var transporter = nodemailer.createTransport({
    //                 service: 'gmail',
    //                 auth: {
    //                     user: 'josephkwagilwa@gmail.com',
    //                     pass: '19041995'
    //                 }
    //             });

    //             var mailOptions = {
    //                 from: name,
    //                 to: receiver,
    //                 subject: 'NEw CONTRACT !!!!',
    //                 html: message,
    //                 attachments: { // file on disk as an attachment
    //                     filename: 'contract.pdf',
    //                     path: __dirname + '/result.pdf'
    //                     // stream this file
    //                 }
    //             };

    //             transporter.sendMail(mailOptions, function (error, info) {
    //                 if (error) {
    //                     console.log(error);
    //                 } else {
    //                     console.log('Email sent: ' + info.response);

    //                 }
    //             });


    //         });
    //     }, function (err) {
    //         console.log(err);
    //     });


})

module.exports = router;