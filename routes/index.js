const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/vehicles', require('./vehicles'))
router.use('/user', require('./user'))
router.use('/oauth',require('./oauth'))

module.exports = router;