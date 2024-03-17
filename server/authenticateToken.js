const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // get token header
  const token = req.headers['authorization'];

  if (!token) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'No token provided' }));
    return;
  }

  try {
    // check token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Token has expired' }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid token' }));
    }
  }
}

module.exports = authMiddleware;