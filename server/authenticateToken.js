//authenticateToken.js
const jwt = require('jsonwebtoken');
const pool = require('./database');


async function authenticateToken(req, res, next) {
  console.log("entering authentiationToken...")
  try {
    const token = req.headers.cookie?.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) {
      console.log("entering NOT token...")
      // throw new Error('No token provided');
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;
    if (decoded.userType === 'user') {
      console.log("entering decoded.userType is user...")
      const [results] = await pool.execute('SELECT * FROM user WHERE UserID = ?', [decoded.userId]);
      user = results[0];
    } else if (decoded.userType === 'employee') {
      console.log("entering decoded.userType is employee...")
      const [results] = await pool.execute('SELECT * FROM staff WHERE StaffID = ?', [decoded.employeeId]);
      user = results[0];
    }

    if (!user) {
      console.log("entering not user...")
      throw new Error('User/Employee not found in database');
    }
    req.user = { ...user, userType: decoded.userType };
    console.log("unexpected error... in authenticateToken.js")
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error("Token expired...");
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Token expired. Please log in again.' }));
    } else {
      console.error("Unexpected error in authenticateToken...");
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }
}


module.exports = authenticateToken;