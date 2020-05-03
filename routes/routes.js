const express = require('express');
const router = express.Router();

router.get('/home', function (req, res) {

    res.status(200).send('succesfully working')
});

module.exports = router;