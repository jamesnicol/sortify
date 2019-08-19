const express = require('express');
const tracks = require('./tracks');

const router = new express.Router();

router.use('/tracks', tracks);

module.exports = router;
