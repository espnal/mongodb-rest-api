const isAuthenticated = (req, res, next) => {
    const token = req.query.token; 
    if (token) {
      next();
    } else {
      res.status(401).json({ error: 'Acceso no autorizado' });
    }
  };
  
  module.exports = isAuthenticated;