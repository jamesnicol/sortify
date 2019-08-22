const express = require('express');
const tracks = require('./tracks');
const auth = require('./auth');

const router = new express.Router();

router.use('/tracks', tracks);
router.use('/auth', auth);

module.exports = router;
