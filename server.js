const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/db.config');
const port = process.env.PORT || 8080;
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
// const oauthController = require('./controllers/oauthController');


app.use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

  app.use(express.static('static'));
  app.get('/static', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
  });
  
  const redirectToGitHub = (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  };

  const handleGitHubCallback = (req, res) => {
    const code = req.query.code;
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
  
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((_res) => _res.data.access_token)
      .then((token) => {
        console.log('My token:', token);
        res.redirect(`/?token=${token}`);
      })
      .catch((err) => {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
      });
  };


  app.get('/oauth', redirectToGitHub);
  app.get('/oauth-callback', handleGitHubCallback);

  app.use(bodyParser.json());
  mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });
