const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/db.config');
const port = process.env.PORT || 8080;
const app = express();
const path = require('path');

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
  

  app.use(bodyParser.json());
  mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });
