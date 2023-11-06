const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauthController');

router.get('/auth', oauthController.redirectToGitHub);
router.get('/oauth-callback', oauthController.handleGitHubCallback);

module.exports = router;
