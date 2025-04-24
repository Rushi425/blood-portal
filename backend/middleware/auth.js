const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ 
      error: 'Access denied. No token provided.',
      isAuthenticated: false 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    res.status(401).json({ 
      error: 'Invalid or expired token',
      isAuthenticated: false 
    });
  }
};

module.exports = { verifyToken };
