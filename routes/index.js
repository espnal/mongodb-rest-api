const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authMiddleware');

router.use('/', require('./swagger'));
router.use('/vehicles', isAuthenticated, require('./vehicles'));
router.use('/user', isAuthenticated, require('./user'));

module.exports = router;