const isAuthenticated = (req, res, next) => {
    const token = req.session.accessToken; 
    if (token) {
      next();
    } else {
      res.status(401).json({ error: 'No authorize Access' });
    }
  };
  
  module.exports = isAuthenticated;