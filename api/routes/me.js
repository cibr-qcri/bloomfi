const express = require('express');
const { protect } = require('../middleware/auth');
const { getMe, updateMe, deleteMe } = require('../controllers/me');

const router = express.Router();

router.use(protect);
router.route('/').get(getMe);
router.route('/').put(updateMe);
router.route('/').delete(deleteMe);

module.exports = router;
