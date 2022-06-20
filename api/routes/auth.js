const express = require('express');
const { login, logout, register, activate } = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.post('/register', register);
router.get('/activate/:token', activate);

module.exports = router;
