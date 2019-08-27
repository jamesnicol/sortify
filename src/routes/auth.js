const express = require('express');
const { login, callback } = require('../controllers/auth');

const router = new express.Router();

router.get('/login', login);
router.get('/callback', callback);

module.exports = router;
