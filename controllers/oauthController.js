const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Lógica para redirigir a la página de inicio de sesión de GitHub.
const redirectToGitHub = (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
  
};
// console.log(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);

/// Lógica para manejar el callback de GitHub.
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

      res.locals.accessToken = token;
      console.log('Token almacenado en res.locals:', token);
      console.log('TODO 55');
      res.redirect(`https://mongodb-rest-api.onrender.com/api-docs`);
    })
    .catch((err) => {
      console.error('Error:', err.message);
      res.status(500).json({ error: err.message });
    });
};


module.exports = {
  redirectToGitHub,
  handleGitHubCallback,
};
