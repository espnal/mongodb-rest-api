const express = require('express');
const router = express.Router();
// const isAuthenticated = require('../middleware/authMiddleware');

router.use('/', require('./swagger'));
router.use('/vehicles',  require('./vehicles'));
router.use('/user',  require('./user'));

module.exports = router;