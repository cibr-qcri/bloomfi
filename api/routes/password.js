const express = require('express');
const { protect } = require('../middleware/auth');
const { forgot, reset, update } = require('../controllers/password.js');

const router = express.Router();

router.put('/forgot', forgot);
router.put('/reset/:token', reset);
router.put('/update', protect, update);

module.exports = router;
