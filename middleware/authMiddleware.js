const isAuthenticated = (req, res, next) => {
    const token = res.locals.accessToken;
    if (token) {
      next();
    } else {
      res.status(401).json({ error: 'No authorized Access' }); 
    }
  };
  
  module.exports = isAuthenticated;
  